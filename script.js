"use strict";


/* =========================================================
   CURUPY ACQUA PARK
   CAMPANHA DIA DOS PAIS 2026
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES PRINCIPAIS

   ALTERE SOMENTE OS LINKS ABAIXO.
   ========================================================= */

const SITE_CONFIG = {
  /*
    Substitua pelo link direto da venda do ingresso.
  */

  purchaseUrl: "https://curupy.com.br/",


  /*
    Substitua pelo número oficial do WhatsApp.

    Utilize:
    55 + DDD + número

    Exemplo:
    https://wa.me/5566999999999
  */

  whatsappUrl: "https://wa.me/5566999999999",


  /*
    Mensagem que será aberta automaticamente
    ao clicar no botão do WhatsApp.
  */

  whatsappMessage:
    "Olá! Tenho uma dúvida sobre o ingresso especial de Dia dos Pais do Curupy.",


  /*
    Nome utilizado nas mensagens internas.
  */

  campaignName: "Dia dos Pais no Curupy"
};


/* =========================================================
   SELETORES PRINCIPAIS
   ========================================================= */

const header =
  document.getElementById("header");

const mobilePurchaseBar =
  document.getElementById("mobilePurchaseBar");

const currentYear =
  document.getElementById("currentYear");

const screenReaderStatus =
  document.getElementById("screenReaderStatus");

const purchaseLinks =
  document.querySelectorAll("[data-purchase-link]");

const whatsappLinks =
  document.querySelectorAll("[data-whatsapp-link]");

const faqList =
  document.getElementById("faqList");

const faqItems =
  Array.from(document.querySelectorAll(".faq-item"));

const faqQuestions =
  document.querySelectorAll(".faq-question");

const faqCategories =
  document.querySelectorAll(".faq-category");

const faqSearch =
  document.getElementById("faqSearch");

const faqSearchResult =
  document.getElementById("faqSearchResult");

const clearFaqSearch =
  document.getElementById("clearFaqSearch");

const faqEmpty =
  document.getElementById("faqEmpty");

const popularQuestionButtons =
  document.querySelectorAll("[data-question-target]");


/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */

/**
 * Normaliza textos para facilitar pesquisas.
 *
 * Exemplo:
 * "Crianças" vira "criancas".
 */

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}


/**
 * Atualiza a área de aviso para leitores de tela.
 */

function announceToScreenReader(message) {
  if (!screenReaderStatus) {
    return;
  }

  screenReaderStatus.textContent = "";

  window.setTimeout(() => {
    screenReaderStatus.textContent = message;
  }, 100);
}


/**
 * Faz rolagem suave até um elemento.
 */

function scrollToElement(element, offset = 90) {
  if (!element) {
    return;
  }

  const elementPosition =
    element.getBoundingClientRect().top +
    window.scrollY;

  const finalPosition =
    elementPosition - offset;

  window.scrollTo({
    top: finalPosition,
    behavior: "smooth"
  });
}


/**
 * Verifica se o usuário está em uma tela de celular.
 */

function isMobileScreen() {
  return window.matchMedia("(max-width: 640px)").matches;
}


/* =========================================================
   LINKS DE COMPRA
   ========================================================= */

function configurePurchaseLinks() {
  purchaseLinks.forEach((link) => {
    link.setAttribute("href", SITE_CONFIG.purchaseUrl);

    /*
      Remove o comportamento interno de âncora
      e abre a compra em uma nova aba.
    */

    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    link.addEventListener("click", () => {
      announceToScreenReader(
        "Abrindo o site oficial para comprar o ingresso."
      );
    });
  });
}


/* =========================================================
   LINKS DO WHATSAPP
   ========================================================= */

function configureWhatsappLinks() {
  const encodedMessage =
    encodeURIComponent(SITE_CONFIG.whatsappMessage);

  const whatsappLink =
    `${SITE_CONFIG.whatsappUrl}?text=${encodedMessage}`;

  whatsappLinks.forEach((link) => {
    link.setAttribute("href", whatsappLink);

    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    link.addEventListener("click", () => {
      announceToScreenReader(
        "Abrindo o atendimento pelo WhatsApp."
      );
    });
  });
}


/* =========================================================
   ANO AUTOMÁTICO NO RODAPÉ
   ========================================================= */

function updateCurrentYear() {
  if (!currentYear) {
    return;
  }

  currentYear.textContent =
    new Date().getFullYear();
}


/* =========================================================
   CABEÇALHO AO ROLAR A PÁGINA
   ========================================================= */

function updateHeaderOnScroll() {
  if (!header) {
    return;
  }

  const shouldApplyBackground =
    window.scrollY > 30;

  header.classList.toggle(
    "is-scrolled",
    shouldApplyBackground
  );
}


/* =========================================================
   BARRA FIXA DE COMPRA NO CELULAR
   ========================================================= */

function updateMobilePurchaseBar() {
  if (!mobilePurchaseBar) {
    return;
  }

  /*
    A barra aparece depois que o visitante
    passa pela parte inicial do Hero.
  */

  const shouldShow =
    isMobileScreen() &&
    window.scrollY > 420;

  mobilePurchaseBar.classList.toggle(
    "is-visible",
    shouldShow
  );
}


/* =========================================================
   FAQ — ABRIR E FECHAR RESPOSTAS
   ========================================================= */

/**
 * Fecha uma pergunta do FAQ.
 */

function closeFaqItem(item) {
  if (!item) {
    return;
  }

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");

  item.classList.remove("is-open");

  if (question) {
    question.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  if (answer) {
    answer.hidden = true;
  }
}


/**
 * Abre uma pergunta do FAQ.
 */

function openFaqItem(item, shouldScroll = false) {
  if (!item) {
    return;
  }

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");

  item.classList.add("is-open");

  if (question) {
    question.setAttribute(
      "aria-expanded",
      "true"
    );
  }

  if (answer) {
    answer.hidden = false;
  }

  if (shouldScroll) {
    window.setTimeout(() => {
      scrollToElement(item, 105);
    }, 100);
  }
}


/**
 * Alterna a abertura da pergunta.
 */

function toggleFaqItem(item) {
  const isOpen =
    item.classList.contains("is-open");

  /*
    Fecha as outras perguntas para evitar
    uma página muito extensa no celular.
  */

  faqItems.forEach((faqItem) => {
    if (faqItem !== item) {
      closeFaqItem(faqItem);
    }
  });

  if (isOpen) {
    closeFaqItem(item);

    announceToScreenReader(
      "Resposta fechada."
    );

    return;
  }

  openFaqItem(item);

  const questionText =
    item
      .querySelector(".faq-question")
      ?.innerText
      ?.trim();

  announceToScreenReader(
    `Resposta aberta: ${questionText || "pergunta selecionada"}.`
  );
}


/**
 * Configura os botões do FAQ.
 */

function configureFaqAccordion() {
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item =
        question.closest(".faq-item");

      toggleFaqItem(item);
    });
  });
}


/* =========================================================
   FAQ — FILTROS POR CATEGORIA
   ========================================================= */

let activeFaqCategory = "all";


/**
 * Verifica se um item pertence à categoria ativa.
 */

function itemMatchesCategory(item) {
  if (activeFaqCategory === "all") {
    return true;
  }

  const itemCategories =
    normalizeText(item.dataset.category || "")
      .split(/\s+/);

  return itemCategories.includes(
    normalizeText(activeFaqCategory)
  );
}


/**
 * Atualiza visualmente os botões de categoria.
 */

function updateActiveCategoryButton(
  selectedCategory
) {
  faqCategories.forEach((button) => {
    const isSelected =
      button.dataset.category === selectedCategory;

    button.classList.toggle(
      "is-active",
      isSelected
    );

    button.setAttribute(
      "aria-pressed",
      String(isSelected)
    );
  });
}


/**
 * Configura os botões de categorias.
 */

function configureFaqCategories() {
  faqCategories.forEach((button) => {
    button.addEventListener("click", () => {
      activeFaqCategory =
        button.dataset.category || "all";

      updateActiveCategoryButton(
        activeFaqCategory
      );

      /*
        Limpa a pesquisa ao mudar de categoria.
      */

      if (faqSearch) {
        faqSearch.value = "";
      }

      updateClearSearchButton();
      filterFaqItems();

      announceToScreenReader(
        `Categoria selecionada: ${button.innerText.trim()}.`
      );
    });
  });
}


/* =========================================================
   FAQ — PESQUISA
   ========================================================= */

/**
 * Retorna todo o conteúdo pesquisável
 * de uma pergunta.
 */

function getFaqSearchableContent(item) {
  const question =
    item.querySelector(".faq-question")
      ?.innerText || "";

  const answer =
    item.querySelector(".faq-answer")
      ?.innerText || "";

  const keywords =
    item.dataset.keywords || "";

  return normalizeText(
    `${question} ${answer} ${keywords}`
  );
}


/**
 * Verifica se o item corresponde à busca.
 */

function itemMatchesSearch(item, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const content =
    getFaqSearchableContent(item);

  /*
    Separa a pesquisa por palavras.

    Isso permite pesquisar, por exemplo:
    "criança documento"
  */

  const searchWords =
    normalizeText(searchTerm)
      .split(/\s+/)
      .filter(Boolean);

  return searchWords.every((word) =>
    content.includes(word)
  );
}


/**
 * Exibe a quantidade de resultados encontrados.
 */

function updateFaqResultMessage(
  visibleCount,
  searchTerm
) {
  if (!faqSearchResult) {
    return;
  }

  if (!searchTerm) {
    faqSearchResult.textContent = "";
    return;
  }

  if (visibleCount === 0) {
    faqSearchResult.textContent =
      "Nenhuma resposta encontrada.";

    return;
  }

  if (visibleCount === 1) {
    faqSearchResult.textContent =
      "1 resposta encontrada.";

    return;
  }

  faqSearchResult.textContent =
    `${visibleCount} respostas encontradas.`;
}


/**
 * Mostra ou esconde o botão de limpar busca.
 */

function updateClearSearchButton() {
  if (!faqSearch || !clearFaqSearch) {
    return;
  }

  clearFaqSearch.hidden =
    faqSearch.value.trim().length === 0;
}


/**
 * Filtra todos os itens de acordo com
 * a categoria e a pesquisa.
 */

function filterFaqItems() {
  const searchTerm =
    faqSearch?.value || "";

  let visibleCount = 0;

  faqItems.forEach((item) => {
    const matchesCategory =
      itemMatchesCategory(item);

    const matchesSearch =
      itemMatchesSearch(item, searchTerm);

    const shouldShow =
      matchesCategory && matchesSearch;

    item.classList.toggle(
      "is-hidden",
      !shouldShow
    );

    if (!shouldShow) {
      closeFaqItem(item);
    }

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (faqEmpty) {
    faqEmpty.hidden =
      visibleCount !== 0;
  }

  updateFaqResultMessage(
    visibleCount,
    searchTerm
  );
}


/**
 * Configura a digitação no campo de pesquisa.
 */

function configureFaqSearch() {
  if (!faqSearch) {
    return;
  }

  let searchTimeout;

  faqSearch.addEventListener("input", () => {
    /*
      Ao pesquisar, mostramos todas as categorias,
      pois o visitante está procurando uma resposta,
      não navegando por grupo.
    */

    activeFaqCategory = "all";

    updateActiveCategoryButton(
      activeFaqCategory
    );

    updateClearSearchButton();

    window.clearTimeout(searchTimeout);

    searchTimeout =
      window.setTimeout(() => {
        filterFaqItems();
      }, 160);
  });


  /*
    Permite limpar a busca pelo teclado
    usando a tecla Escape.
  */

  faqSearch.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      faqSearch.value
    ) {
      clearFaqSearchField();
    }
  });


  if (clearFaqSearch) {
    clearFaqSearch.addEventListener(
      "click",
      clearFaqSearchField
    );
  }
}


/**
 * Limpa o campo de pesquisa.
 */

function clearFaqSearchField() {
  if (!faqSearch) {
    return;
  }

  faqSearch.value = "";

  activeFaqCategory = "all";

  updateActiveCategoryButton(
    activeFaqCategory
  );

  updateClearSearchButton();
  filterFaqItems();

  faqSearch.focus();

  announceToScreenReader(
    "Pesquisa limpa."
  );
}


/* =========================================================
   FAQ — PERGUNTAS MAIS PROCURADAS
   ========================================================= */

function configurePopularQuestions() {
  popularQuestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId =
        button.dataset.questionTarget;

      const targetItem =
        document.getElementById(targetId);

      if (!targetItem) {
        return;
      }

      /*
        Limpa filtros para garantir que a pergunta apareça.
      */

      activeFaqCategory = "all";

      updateActiveCategoryButton(
        activeFaqCategory
      );

      if (faqSearch) {
        faqSearch.value = "";
      }

      updateClearSearchButton();
      filterFaqItems();

      /*
        Fecha as perguntas anteriores.
      */

      faqItems.forEach((item) => {
        closeFaqItem(item);
      });

      openFaqItem(
        targetItem,
        true
      );

      const questionText =
        targetItem
          .querySelector(".faq-question")
          ?.innerText
          ?.trim();

      announceToScreenReader(
        `Resposta aberta: ${questionText || "pergunta selecionada"}.`
      );
    });
  });
}


/* =========================================================
   NAVEGAÇÃO SUAVE PARA LINKS INTERNOS
   ========================================================= */

function configureInternalLinks() {
  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetSelector =
        link.getAttribute("href");

      if (!targetSelector) {
        return;
      }

      const targetElement =
        document.querySelector(targetSelector);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      scrollToElement(
        targetElement,
        isMobileScreen() ? 80 : 92
      );
    });
  });
}


/* =========================================================
   ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
   ========================================================= */

function configureScrollAnimations() {
  const animatedElements =
    document.querySelectorAll(`
      .section-heading,
      .info-card,
      .eligibility-card,
      .step-card,
      .offer__content,
      .offer-card,
      .check-item,
      .before-buy__highlight,
      .faq-search,
      .popular-questions,
      .faq-categories,
      .faq-item,
      .support__content,
      .support-card,
      .final-cta__content
    `);

  /*
    Caso o navegador não suporte IntersectionObserver,
    os elementos aparecem normalmente.
  */

  if (!("IntersectionObserver" in window)) {
    return;
  }

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform =
      "translateY(22px)";

    element.style.transition =
      "opacity 650ms ease, transform 650ms cubic-bezier(.22, 1, .36, 1)";
  });

  const animationObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );

  animatedElements.forEach((element, index) => {
    /*
      Pequeno atraso progressivo para cards.
    */

    const delay =
      Math.min((index % 6) * 45, 225);

    element.style.transitionDelay =
      `${delay}ms`;

    animationObserver.observe(element);
  });
}


/* =========================================================
   DESTACAR SEÇÃO VISÍVEL NO MENU
   ========================================================= */

function configureSectionObserver() {
  const navigationLinks =
    document.querySelectorAll(
      '.footer__links a[href^="#"]'
    );

  const sections =
    Array.from(navigationLinks)
      .map((link) => {
        const selector =
          link.getAttribute("href");

        return selector
          ? document.querySelector(selector)
          : null;
      })
      .filter(Boolean);

  if (
    !sections.length ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const currentId =
            `#${entry.target.id}`;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === currentId;

            link.classList.toggle(
              "is-active",
              isActive
            );
          });
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


/* =========================================================
   MELHORIAS DE ACESSIBILIDADE
   ========================================================= */

function configureAccessibility() {
  /*
    Garante que links externos possuam
    indicação acessível.
  */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  externalLinks.forEach((link) => {
    const currentLabel =
      link.getAttribute("aria-label");

    if (currentLabel) {
      link.setAttribute(
        "aria-label",
        `${currentLabel}. Abre em uma nova aba.`
      );
    }
  });


  /*
    Fecha a pergunta aberta ao pressionar Escape.
  */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const openItem =
      document.querySelector(
        ".faq-item.is-open"
      );

    if (!openItem) {
      return;
    }

    const question =
      openItem.querySelector(
        ".faq-question"
      );

    closeFaqItem(openItem);

    question?.focus();

    announceToScreenReader(
      "Resposta fechada."
    );
  });
}


/* =========================================================
   VALIDAÇÃO DOS LINKS PRINCIPAIS
   ========================================================= */

function validateSiteConfig() {
  const isDefaultWhatsapp =
    SITE_CONFIG.whatsappUrl.includes(
      "5566999999999"
    );

  if (isDefaultWhatsapp) {
    console.warn(
      "Curupy: atualize o número do WhatsApp em SITE_CONFIG.whatsappUrl."
    );
  }

  if (!SITE_CONFIG.purchaseUrl) {
    console.warn(
      "Curupy: informe o link de compra em SITE_CONFIG.purchaseUrl."
    );
  }
}


/* =========================================================
   EVENTOS DE ROLAGEM E REDIMENSIONAMENTO
   ========================================================= */

function handlePageScroll() {
  updateHeaderOnScroll();
  updateMobilePurchaseBar();
}


/*
  Evita executar funções excessivamente
  durante o redimensionamento da tela.
*/

let resizeTimeout;

function handlePageResize() {
  window.clearTimeout(resizeTimeout);

  resizeTimeout =
    window.setTimeout(() => {
      updateMobilePurchaseBar();
    }, 150);
}


/* =========================================================
   INICIALIZAÇÃO DA PÁGINA
   ========================================================= */

function initializePage() {
  validateSiteConfig();

  configurePurchaseLinks();
  configureWhatsappLinks();

  updateCurrentYear();

  configureInternalLinks();

  configureFaqAccordion();
  configureFaqCategories();
  configureFaqSearch();
  configurePopularQuestions();

  configureScrollAnimations();
  configureSectionObserver();
  configureAccessibility();

  updateHeaderOnScroll();
  updateMobilePurchaseBar();
  updateClearSearchButton();
  filterFaqItems();

  window.addEventListener(
    "scroll",
    handlePageScroll,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    handlePageResize
  );
}


/*
  Aguarda o HTML ser completamente carregado.
*/

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializePage
  );
} else {
  initializePage();
}
