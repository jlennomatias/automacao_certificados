import fs from 'fs';
import gerarCertificados from "./gerarCertificados.js";
import path from 'path';

const clientes = ['cli_teste'];
const fapis = ['fapi1', 'fapi2', 'dcr'];
const certificados = ['brcac', 'enc', 'sig'];

for (const cliente of clientes) {
    for (const fapi of fapis) {
        for (const certi of certificados) {
            const caminho = path.join(cliente, fapi, certi);

            try {
                await fs.mkdir(caminho, { recursive: true }, (err) => {
                    if (err) {
                        console.error(`Erro ao criar pasta ${caminho}: ${err.message}`);
                    } else {
                        if (certi === 'sig' || certi === 'enc') {
                            gerarCertificados(path.join(cliente, fapi, certi));
                        }
                    }
                });
            } catch (error) {
                console.error(`Erro ao criar pasta ${caminho}: ${error.message}`);
            }
        }
    }
}

