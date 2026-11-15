async function calcularHashSenha(senha, salt, iteracoes) {
    const chave = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(senha),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const resultado = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: iteracoes,
            hash: "SHA-256"
        },
        chave,
        256
    );

    return Array.from(new Uint8Array(resultado), function (byte) {
        return byte.toString(16).padStart(2, "0");
    }).join("");
}

