/**
 * Encrypted Data Vault Engine for 165-Day Study Journey
 * Powered by Web Crypto API: AES-GCM 256-bit with PBKDF2 Key Derivation (100,000 iterations)
 * Step 100 / 100 - Zero-Latency PWA Hardening & Encrypted Data Vault
 */

const VAULT_MAGIC_HEADER = new Uint8Array([0x49, 0x45, 0x4c, 0x54, 0x53, 0x56, 0x4c, 0x54]); // "IELTSVLT"
const SALT_BYTES = 16;
const IV_BYTES = 12;
const PBKDF2_ITERATIONS = 100000;

export interface VaultExportMetadata {
  version: string;
  exportedAt: string;
  studentName: string;
  dayCount: number;
  tablesIncluded: string[];
}

export interface EncryptedVaultPayload {
  metadata: VaultExportMetadata;
  tables: {
    user_progress?: unknown[];
    theory_lessons?: unknown[];
    vocab_matrix?: unknown[];
    error_bank?: unknown[];
    practice_logs?: unknown[];
    ai_submissions?: unknown[];
  };
}

/**
 * Derive AES-GCM 256-bit CryptoKey from user password and salt using PBKDF2
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Export entire IndexedDB database dump to a password-protected .ieltsvault binary file
 */
export async function exportEncryptedVault(
  payload: EncryptedVaultPayload,
  password: string
): Promise<{ blob: Blob; filename: string; sizeBytes: number }> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    throw new Error('Web Crypto API is not supported in this environment.');
  }

  const jsonString = JSON.stringify(payload);
  const encoder = new TextEncoder();
  const rawData = encoder.encode(jsonString);

  // 1. Generate random Salt (16 bytes) and IV (12 bytes)
  const salt = new Uint8Array(SALT_BYTES);
  const iv = new Uint8Array(IV_BYTES);
  window.crypto.getRandomValues(salt);
  window.crypto.getRandomValues(iv);

  // 2. Derive 256-bit AES-GCM Key
  const key = await deriveKey(password, salt);

  // 3. Encrypt payload
  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as unknown as BufferSource
    },
    key,
    rawData as unknown as BufferSource
  );

  const ciphertext = new Uint8Array(ciphertextBuffer);

  // 4. Pack Header + Salt + IV + Ciphertext
  const totalLength = VAULT_MAGIC_HEADER.length + SALT_BYTES + IV_BYTES + ciphertext.length;
  const packedFile = new Uint8Array(totalLength);

  let offset = 0;
  packedFile.set(VAULT_MAGIC_HEADER, offset);
  offset += VAULT_MAGIC_HEADER.length;

  packedFile.set(salt, offset);
  offset += SALT_BYTES;

  packedFile.set(iv, offset);
  offset += IV_BYTES;

  packedFile.set(ciphertext, offset);

  const blob = new Blob([packedFile], { type: 'application/octet-stream' });
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `ielts_forme_vault_day165_${dateStr}.ieltsvault`;

  return {
    blob,
    filename,
    sizeBytes: packedFile.byteLength
  };
}

/**
 * Import and Decrypt a .ieltsvault file using user password
 */
export async function importEncryptedVault(
  fileBuffer: ArrayBuffer,
  password: string
): Promise<EncryptedVaultPayload> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    throw new Error('Web Crypto API is not supported in this environment.');
  }

  const fileBytes = new Uint8Array(fileBuffer);

  // 1. Verify Magic Header
  if (fileBytes.length < VAULT_MAGIC_HEADER.length + SALT_BYTES + IV_BYTES) {
    throw new Error('Tệp không đúng định dạng hoặc bị hư hại (Dung lượng quá nhỏ).');
  }

  for (let i = 0; i < VAULT_MAGIC_HEADER.length; i++) {
    if (fileBytes[i] !== VAULT_MAGIC_HEADER[i]) {
      throw new Error('Định dạng tệp không hợp lệ. Vui lòng chọn tệp .ieltsvault hợp lệ.');
    }
  }

  // 2. Extract Salt, IV, and Ciphertext
  let offset = VAULT_MAGIC_HEADER.length;

  const salt = fileBytes.slice(offset, offset + SALT_BYTES);
  offset += SALT_BYTES;

  const iv = fileBytes.slice(offset, offset + IV_BYTES);
  offset += IV_BYTES;

  const ciphertext = fileBytes.slice(offset);

  // 3. Derive Key from Password and Salt
  const key = await deriveKey(password, salt);

  // 4. Decrypt with AES-GCM
  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv as unknown as BufferSource
      },
      key,
      ciphertext as unknown as BufferSource
    );

    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decryptedBuffer);
    const payload: EncryptedVaultPayload = JSON.parse(jsonString);

    return payload;
  } catch (err) {
    console.error('Decryption failed:', err);
    throw new Error('Mật khẩu giải mã không chính xác hoặc dữ liệu két sắt đã bị can thiệp.');
  }
}
