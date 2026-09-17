# Testes de validação — Formulário de contato

## Teste 1: enviar sem preencher

Tentei enviar o formulário sem preencher nenhum campo.

* Campo bloqueado: Nome
* Mensagem exibida: Preencha este campo.

## Teste 2: nome com 2 letras

Digitei "Jo" no campo de nome.

* Campo bloqueado: Nome
* Mensagem exibida: Aumente o número de caracteres.

## Teste 3: e-mail sem @

Digitei um e-mail sem o caractere @.

* Campo bloqueado: E-mail
* Mensagem exibida: Inclua um "@" no endereço de e-mail.

## Teste 4: CPF fora do padrão

Digitei o CPF em um formato diferente do padrão definido no formulário.

* Campo bloqueado: CPF
* Mensagem exibida: O valor não corresponde ao formato solicitado.

## Teste 5: município não selecionado

Tentei enviar o formulário sem escolher um município.

* Campo bloqueado: Município
* Mensagem exibida: Selecione um item da lista.
