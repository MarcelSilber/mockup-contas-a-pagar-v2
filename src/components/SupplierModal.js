// src/components/SupplierModal.js

import React, { useState } from "react";
import "./Modal.css";

function SupplierModal({ isOpen, onClose }) {
  const [tipo, setTipo] = useState("CNPJ (Pessoa Jurídica)");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleCadastrar = () => {
    const dadosFornecedor = {
      tipo,
      razaoSocial:
        tipo === "CNPJ (Pessoa Jurídica)" ? razaoSocial : nomeCompleto,
      documento: tipo === "CNPJ (Pessoa Jurídica)" ? cnpj : cpf,
      endereco,
      contato,
    };
    console.log("Fornecedor Cadastrado:", dadosFornecedor);
    alert("Fornecedor cadastrado com sucesso! (Ver console para dados)");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Cadastrar Fornecedor</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p>
            Preencha os dados do fornecedor. Campos marcados com * são
            obrigatórios.
          </p>

          <div className="radio-group">
            <label>Tipo *</label>
            <label>
              <input
                type="radio"
                value="CNPJ (Pessoa Jurídica)"
                checked={tipo === "CNPJ (Pessoa Jurídica)"}
                onChange={(e) => setTipo(e.target.value)}
              />
              CNPJ (Pessoa Jurídica)
            </label>
            <label>
              <input
                type="radio"
                value="CPF (Pessoa Física)"
                checked={tipo === "CPF (Pessoa Física)"}
                onChange={(e) => setTipo(e.target.value)}
              />
              CPF (Pessoa Física)
            </label>
          </div>

          {tipo === "CNPJ (Pessoa Jurídica)" ? (
            <>
              <div className="input-row full-width">
                <label>Razão Social *</label>
                <input
                  type="text"
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  placeholder="Ex: ABC Fornecimentos Ltda"
                />
              </div>
              <div className="input-row full-width">
                <label>CNPJ *</label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  placeholder="Ex: 12.345.678/0001-90"
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-row full-width">
                <label>Nome Completo *</label>
                <input
                  type="text"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  placeholder="Ex: Marcel"
                />
              </div>
              <div className="input-row full-width">
                <label>CPF *</label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Ex: 123.456.789-00"
                />
              </div>
            </>
          )}

          <div className="input-row full-width">
            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Ex: Rua Marquesa de Santos, 123, Bairro Centro"
            />
          </div>
          <div className="input-row full-width">
            <label>Contto (Telefone/Email)</label>
            <input
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              placeholder="Ex: (21) 98542-5557 ou contato@fafiltec.edu.br"
            />
          </div>

          <div className="input-row full-width">
            <label>Descrição</label>
            <textarea placeholder="Digite uma descrição (opcional)"></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-cadastrar" onClick={handleCadastrar}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierModal;
