
import crypto from "crypto";
import fs from 'fs';
import forge from 'node-forge';

const PASS = '1234';

function gerarCertificados(caminho) {
  // Gerar chave privada com senha
  const chavePrivadaComSenha = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: PASS
    }
  });

  // Salvar a chave privada com senha em um arquivo
  fs.writeFileSync(`${caminho}/chavePrivadaComSenha.pem`, chavePrivadaComSenha.privateKey);
  fs.writeFileSync(`${caminho}/chavepublica.pem`, chavePrivadaComSenha.publicKey);

  // Remover a senha da chave privada
  const chavePrivadaSemSenha = forge.pki.privateKeyToPem(forge.pki.decryptRsaPrivateKey(
    chavePrivadaComSenha.privateKey,
    PASS
  ));

  // Salvar a chave privada sem senha em um arquivo
  fs.writeFileSync(`${caminho}/chavePrivadaSemSenha.pem`, chavePrivadaSemSenha);

  console.log('Certificados criados com sucesso.');
}


export default gerarCertificados;