// src/App.js
import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faTags,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import SupplierModal from "./components/SupplierModal";

// --- ESTRUTURA DE DADOS PLANO DE CONTAS FILADÉLFIA (2 Níveis) ---
const CATEGORY_MOCKUP = [
  {
    category: "Operacional",
    subcategories: [
      "Administrativo",
      "Financeiro",
      "Didático",
      "Equipamento Aluguel",
      "Equipamento manutenção",
      "Hospedagens e Viagens",
      "Judicial",
      "Marketing",
      "Parcerias",
      "Prédio",
      "Recursos Humanos - RH",
      "Seguros",
      "Sistema de comunicação",
      "Impostos e Taxas",
      "Veículos",
    ],
  },
  {
    category: "Comercial",
    subcategories: [
      "Congressos e feiras",
      "Investimento didático",
      "Investimento de tecnologia",
      "Investimento da Marca",
    ],
  },
  {
    category: "RH",
    subcategories: ["Convenções", "Funcionários", "Investimento de RH"],
  },
  {
    category: "Patrimônio",
    subcategories: [
      "Bens Imóveis",
      "Equipamentos",
      "Investimento de Capital",
      "Veículo",
    ],
  },
];
// ------------------------------------------------------------------------

function ContasAPagar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // === ESTADOS DE CATEGORIZAÇÃO (SOMENTE 2 NÍVEIS) ===
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // === ESTADOS DADOS DA CONTA ===
  const [dataVencimento, setDataVencimento] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  // Memoização das Subcategorias baseadas na Categoria selecionada
  const availableSubcategories = useMemo(() => {
    const foundCategory = CATEGORY_MOCKUP.find(
      (cat) => cat.category === selectedCategory
    );
    return foundCategory ? foundCategory.subcategories : [];
  }, [selectedCategory]);

  // Função para limpar a Subcategoria ao mudar a Categoria
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(""); // Reseta a subcategoria
  };

  const handleCadastrarConta = () => {
    const conta = {
      fornecedor: "Selecionado/Mock",
      categoria: selectedCategory,
      subcategoria: selectedSubcategory,
      dataVencimento,
      valor,
      descricao,
    };
    console.log("Dados da Conta:", conta);
    alert(
      `Conta cadastrada em ${selectedCategory} / ${selectedSubcategory}. (Ver console para dados)`
    );
  };

  const handleLimpar = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setDataVencimento("");
    setValor("");
    setDescricao("");
  };

  return (
    <div className="contas-a-pagar-container">
      <h1>Contas a Pagar</h1>
      <p>Cadastre uma nova conta selecionando ou cadastrando o fornecedor</p>

      <div className="form-grid">
        {/* === Fornecedor === */}
        <div className="section fornecedor-section">
          <div className="section-header">
            <h2>
              <FontAwesomeIcon icon={faUserFriends} /> Fornecedor
            </h2>
          </div>
          <div className="supplier-controls">
            <button
              className="btn-novo-fornecedor"
              onClick={() => setIsModalOpen(true)}
            >
              + Novo Fornecedor
            </button>
            <div className="dropdown-container">
              <label>Selecionar Fornecedor</label>
              <select>
                <option value="">Buscar fornecedor...</option>
              </select>
            </div>
            <div className="selected-supplier-info">
              {/* Informações detalhadas do fornecedor */}
            </div>
          </div>
        </div>

        {/* === Categorização (2 DROPDOWNS) === */}
        <div className="section categorizacao-section">
          <div className="section-header">
            <h2>
              <FontAwesomeIcon icon={faTags} /> Categorização
            </h2>
          </div>
          <div
            className="dropdown-group"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {/* 1. Categoria */}
            <div className="dropdown-container">
              <label>Categoria *</label>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Selecione...</option>
                {CATEGORY_MOCKUP.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Sub-categoria (Dependente da Categoria) */}
            <div className="dropdown-container">
              <label>Sub-categoria *</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
              >
                <option value="">Selecione...</option>
                {availableSubcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Placeholder para o 3º dropdown (Item) para manter o layout visual de 3 colunas */}
            <div className="dropdown-container">
              <label>Item *</label>
              <select disabled>
                <option>Selecione...</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* === Dados da Conta === */}
      <div className="section dados-conta-section">
        <div className="section-header">
          <h2>
            <FontAwesomeIcon icon={faClipboardList} /> Dados da Conta
          </h2>
        </div>
        <div className="data-input-group">
          <div className="input-container">
            <label>Data de Vencimento *</label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
            />
          </div>
          <div className="input-container value-input">
            <label>Valor (R$) *</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              step="0.01"
              placeholder="0,00"
            />
          </div>
        </div>
        <div className="input-container full-width description-input">
          <label>Descrição (opcional)</label>
          <textarea
            placeholder="Digite uma descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-limpar" onClick={handleLimpar}>
          Limpar
        </button>
        <button className="btn-cadastrar" onClick={handleCadastrarConta}>
          Cadastrar Conta
        </button>
      </div>

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default ContasAPagar;
