"use strict";


/* =========================================================
   CURUPY ACQUA PARK
   CAMPANHA DIA DOS PAIS 2026
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES PRINCIPAIS

   ALTERE APENAS OS LINKS ABAIXO.
   ========================================================= */

const SITE_CONFIG = {

  /*
    Link direto para a página de compra do ingresso.

    Substitua pelo endereço correto da campanha.
  */

  purchaseUrl: "https://sofalta.eu/meuingresso/no/curupyacquapark/#/",


  /*
    Número oficial do WhatsApp.

    Formato:
    55 + DDD + número

    Exemplo:
    https://wa.me/5566999999999
  */

  whatsappUrl: "https://wa.me/556630151337",


  /*
    Mensagem aberta automaticamente no WhatsApp.
  */

  whatsappMessage:
    "Olá! Tenho uma dúvida sobre o ingresso especial de Dia dos Pais do Curupy.",


  /*
    Nome da campanha.
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


/* =========================================================
   ASSISTENTE CURUPY
   ========================================================= */

const assistantTrigger =
  document.getElementById("assistantTrigger");

const assistantPanel =
  document.getElementById("assistantPanel");

const assistantClose =
  document.getElementById("assistantClose");

const assistantOverlay =
  document.getElementById("assistantOverlay");

const assistantBody =
  document.getElementById("assistantBody");

const assistantConversation =
  document.getElementById("assistantConversation");

const assistantForm =
  document.getElementById("assistantForm");

const assistantInput =
  document.getElementById("assistantInput");

const assistantOpenButtons =
  document.querySelectorAll("[data-open-assistant]");

const assistantQuestionButtons =
  document.querySelectorAll("[data-assistant-question]");


/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */

/**
 * Remove acentos, transforma em minúsculas
 * e facilita a comparação de textos.
 */

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


/**
 * Envia um aviso para leitores de tela.
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

  window.scrollTo({
    top: elementPosition - offset,
    behavior: "smooth"
  });
}


/**
 * Verifica se a tela é de celular.
 */

function isMobileScreen() {
  return window.matchMedia(
    "(max-width: 640px)"
  ).matches;
}


/**
 * Escapa caracteres antes de inserir
 * conteúdo digitado pelo visitante no HTML.
 */

function escapeHtml(text = "") {
  const temporaryElement =
    document.createElement("div");

  temporaryElement.textContent = text;

  return temporaryElement.innerHTML;
}


/* =========================================================
   LINKS DE COMPRA
   ========================================================= */

function configurePurchaseLinks() {
  purchaseLinks.forEach((link) => {
    link.setAttribute(
      "href",
      SITE_CONFIG.purchaseUrl
    );

    link.setAttribute(
      "target",
      "_blank"
    );

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

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
    encodeURIComponent(
      SITE_CONFIG.whatsappMessage
    );

  const separator =
    SITE_CONFIG.whatsappUrl.includes("?")
      ? "&"
      : "?";

  const completeWhatsappLink =
    `${SITE_CONFIG.whatsappUrl}${separator}text=${encodedMessage}`;

  whatsappLinks.forEach((link) => {
    link.setAttribute(
      "href",
      completeWhatsappLink
    );

    link.setAttribute(
      "target",
      "_blank"
    );

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

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

  header.classList.toggle(
    "is-scrolled",
    window.scrollY > 30
  );
}


/* =========================================================
   BARRA FIXA DE COMPRA NO CELULAR
   ========================================================= */

function updateMobilePurchaseBar() {
  if (!mobilePurchaseBar) {
    return;
  }

  const assistantIsOpen =
    assistantPanel?.classList.contains(
      "is-open"
    );

  const shouldShow =
    isMobileScreen() &&
    window.scrollY > 420 &&
    !assistantIsOpen;

  mobilePurchaseBar.classList.toggle(
    "is-visible",
    shouldShow
  );
}


/* =========================================================
   RESPOSTAS DO ASSISTENTE
   ========================================================= */

const ASSISTANT_RESPONSES = {

  bilheteria: {
    title: "Compra na bilheteria",
    answer:
      "Não. O ingresso especial de Dia dos Pais é vendido exclusivamente pelo site oficial e deve ser comprado com pelo menos 1 dia de antecedência.",
    action: "purchase"
  },

  criancas: {
    title: "Ingresso para crianças",
    answer:
      "Crianças de 0 a 4 anos não pagam, mediante apresentação de documento. De 5 a 11 anos, é necessário comprar o ingresso Kids disponível no site oficial.",
    action: "purchase"
  },

  "eco-park": {
    title: "Eco Park Aventura",
    answer:
      "Não. As atrações do Eco Park Aventura não estão incluídas neste ingresso e possuem cobrança separada."
  },

  qrcode: {
    title: "Recebimento do ingresso",
    answer:
      "Após a compra, o ingresso com QR Code será enviado para o e-mail informado. Ele também poderá ser consultado na área Minhas Compras do site."
  },

  pagamento: {
    title: "Formas de pagamento",
    answer:
      "A compra pelo site pode ser parcelada em até 3 vezes sem juros. As formas disponíveis serão apresentadas durante a finalização do pedido.",
    action: "purchase"
  },

  alimentos: {
    title: "Entrada de alimentos",
    answer:
      "É permitida a entrada com água, tereré e chimarrão. Outros alimentos e bebidas não são permitidos. O Curupy possui diferentes opções de alimentação dentro do parque."
  },

  antecedencia: {
    title: "Antecedência da compra",
    answer:
      "O ingresso deve ser comprado pelo site oficial com pelo menos 1 dia de antecedência. Não será possível comprar essa condição promocional no próprio domingo.",
    action: "purchase"
  },

  pais: {
    title: "Quem pode usar a promoção",
    answer:
      "A condição especial é destinada às figuras paternas. Mulheres, crianças e demais acompanhantes devem adquirir a categoria correspondente no site oficial."
  },

  esposa: {
    title: "Ingresso para acompanhantes",
    answer:
      "O valor de R$ 59 é exclusivo para pais. Esposas, companheiras e demais visitantes devem comprar o ingresso correspondente à sua categoria.",
    action: "purchase"
  },

  quantidade: {
    title: "Quantidade de ingressos",
    answer:
      "Cada pai pode utilizar apenas 1 ingresso promocional. Caso o grupo tenha mais de uma figura paterna, cada uma poderá utilizar seu próprio ingresso."
  },

  documentos: {
    title: "Documentos necessários",
    answer:
      "Tenha um documento pessoal oficial com foto para a validação. Para crianças, também é necessário apresentar um documento que permita comprovar a idade."
  },

  imprimir: {
    title: "Ingresso digital",
    answer:
      "Não é necessário imprimir. Você pode apresentar o QR Code diretamente na tela do celular, no guichê de validação dos ingressos online."
  },

  estacionamento: {
    title: "Estacionamento",
    answer:
      "Sim. O Curupy possui estacionamento para os visitantes."
  },

  "guarda-volumes": {
    title: "Guarda-volumes",
    answer:
      "Sim. O parque possui serviço de guarda-volumes pago, recomendado para armazenar objetos pessoais durante a visita."
  },

  retorno: {
    title: "Saída e retorno",
    answer:
      "É possível sair e retornar no mesmo dia, desde que a pulseira de identificação permaneça inteira e legível."
  },

  horario: {
    title: "Horário de funcionamento",
    answer:
      "Consulte os horários oficiais de funcionamento antes da visita, pois eles podem variar conforme a data e a programação do parque.",
    action: "whatsapp"
  },

  valor: {
    title: "Valor promocional",
    answer:
      "O ingresso especial para pais custa R$ 59,00 e é válido exclusivamente para domingo, 09 de agosto de 2026.",
    action: "purchase"
  },

  data: {
    title: "Data da promoção",
    answer:
      "A promoção é válida exclusivamente para domingo, 09 de agosto de 2026.",
    action: "purchase"
  },

  chuva: {
    title: "Visita em caso de chuva",
    answer:
      "O funcionamento das atrações pode ser ajustado temporariamente em situações de chuva forte, raios ou condições que comprometam a segurança. Para informações próximas à data, fale com a equipe.",
    action: "whatsapp"
  }
};


/* =========================================================
   PALAVRAS-CHAVE DO ASSISTENTE
   ========================================================= */

const ASSISTANT_KEYWORDS = [

  {
    response: "bilheteria",
    keywords: [
      "bilheteria",
      "portaria",
      "comprar na hora",
      "comprar no parque",
      "comprar no dia",
      "comprar domingo"
    ]
  },

  {
    response: "criancas",
    keywords: [
      "crianca",
      "criancas",
      "filho",
      "filha",
      "kids",
      "idade",
      "0 a 4",
      "5 a 11"
    ]
  },

  {
    response: "eco-park",
    keywords: [
      "eco park",
      "ecopark",
      "aventura",
      "arvorismo"
    ]
  },

  {
    response: "qrcode",
    keywords: [
      "qr code",
      "qrcode",
      "receber ingresso",
      "email",
      "e mail",
      "minhas compras"
    ]
  },

  {
    response: "pagamento",
    keywords: [
      "parcelar",
      "parcelamento",
      "cartao",
      "credito",
      "debito",
      "pix",
      "3x",
      "tres vezes",
      "forma de pagamento"
    ]
  },

  {
    response: "alimentos",
    keywords: [
      "alimento",
      "alimentos",
      "comida",
      "bebida",
      "agua",
      "terere",
      "chimarrao",
      "levar comida"
    ]
  },

  {
    response: "antecedencia",
    keywords: [
      "antecedencia",
      "um dia antes",
      "1 dia",
      "comprar antes",
      "comprar no domingo"
    ]
  },

  {
    response: "pais",
    keywords: [
      "quem pode",
      "quem participa",
      "pai",
      "padrasto",
      "avo",
      "tio",
      "figura paterna",
      "homem"
    ]
  },

  {
    response: "esposa",
    keywords: [
      "esposa",
      "mulher",
      "mae",
      "companheira",
      "acompanhante",
      "demais visitantes"
    ]
  },

  {
    response: "quantidade",
    keywords: [
      "quantidade",
      "mais de um",
      "dois ingressos",
      "limite",
      "quantos ingressos"
    ]
  },

  {
    response: "documentos",
    keywords: [
      "documento",
      "documentos",
      "identidade",
      "rg",
      "cnh",
      "certidao",
      "comprovar idade"
    ]
  },

  {
    response: "imprimir",
    keywords: [
      "imprimir",
      "impresso",
      "papel",
      "mostrar no celular"
    ]
  },

  {
    response: "estacionamento",
    keywords: [
      "estacionamento",
      "estacionar",
      "carro",
      "vaga"
    ]
  },

  {
    response: "guarda-volumes",
    keywords: [
      "guarda volumes",
      "guardavolumes",
      "armario",
      "armarios",
      "guardar objetos"
    ]
  },

  {
    response: "retorno",
    keywords: [
      "sair e voltar",
      "retornar",
      "retorno",
      "sair do parque",
      "entrar novamente"
    ]
  },

  {
    response: "horario",
    keywords: [
      "horario",
      "abre",
      "fecha",
      "funcionamento",
      "que horas"
    ]
  },

  {
    response: "valor",
    keywords: [
      "valor",
      "preco",
      "quanto custa",
      "59",
      "r$ 59"
    ]
  },

  {
    response: "data",
    keywords: [
      "data",
      "dia 9",
      "09 de agosto",
      "9 de agosto",
      "quando"
    ]
  },

  {
    response: "chuva",
    keywords: [
      "chuva",
      "chover",
      "tempo",
      "raio",
      "tempestade"
    ]
  }
];


/* =========================================================
   ABERTURA E FECHAMENTO DO ASSISTENTE
   ========================================================= */

let assistantLastFocusedElement = null;


/**
 * Abre o painel do Assistente Curupy.
 */

function openAssistant() {
  if (!assistantPanel) {
    return;
  }

  assistantLastFocusedElement =
    document.activeElement;

  assistantPanel.hidden = false;

  if (assistantOverlay) {
    assistantOverlay.hidden = false;
  }

  /*
    Aguarda o navegador reconhecer a remoção
    do atributo hidden antes da animação.
  */

  window.requestAnimationFrame(() => {
    assistantPanel.classList.add("is-open");

    assistantOverlay?.classList.add(
      "is-visible"
    );
  });

  assistantOpenButtons.forEach((button) => {
    button.setAttribute(
      "aria-expanded",
      "true"
    );
  });

  document.body.classList.add(
    "assistant-is-open"
  );

  updateMobilePurchaseBar();

  window.setTimeout(() => {
    assistantInput?.focus();
  }, 250);

  announceToScreenReader(
    "Assistente Curupy aberto."
  );
}


/**
 * Fecha o painel do Assistente Curupy.
 */

function closeAssistant() {
  if (!assistantPanel) {
    return;
  }

  assistantPanel.classList.remove("is-open");

  assistantOverlay?.classList.remove(
    "is-visible"
  );

  assistantOpenButtons.forEach((button) => {
    button.setAttribute(
      "aria-expanded",
      "false"
    );
  });

  document.body.classList.remove(
    "assistant-is-open"
  );

  window.setTimeout(() => {
    assistantPanel.hidden = true;

    if (assistantOverlay) {
      assistantOverlay.hidden = true;
    }

    updateMobilePurchaseBar();

    if (
      assistantLastFocusedElement instanceof
      HTMLElement
    ) {
      assistantLastFocusedElement.focus();
    }
  }, 280);

  announceToScreenReader(
    "Assistente Curupy fechado."
  );
}


/**
 * Configura os botões que abrem
 * e fecham o assistente.
 */

function configureAssistantPanel() {
  assistantOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen =
        assistantPanel?.classList.contains(
          "is-open"
        );

      if (isOpen) {
        closeAssistant();
        return;
      }

      openAssistant();
    });
  });

  assistantClose?.addEventListener(
    "click",
    closeAssistant
  );

  assistantOverlay?.addEventListener(
    "click",
    closeAssistant
  );
}


/* =========================================================
   MENSAGENS DO ASSISTENTE
   ========================================================= */

/**
 * Faz o painel rolar até a mensagem mais recente.
 */

function scrollAssistantToBottom() {
  if (!assistantBody) {
    return;
  }

  window.requestAnimationFrame(() => {
    assistantBody.scrollTo({
      top: assistantBody.scrollHeight,
      behavior: "smooth"
    });
  });
}


/**
 * Adiciona uma mensagem enviada pelo visitante.
 */

function addUserMessage(message) {
  if (!assistantConversation) {
    return;
  }

  const messageElement =
    document.createElement("div");

  messageElement.className =
    "assistant-message assistant-message--user";

  messageElement.innerHTML = `
    <div class="assistant-message__content">
      <p>${escapeHtml(message)}</p>
    </div>
  `;

  assistantConversation.appendChild(
    messageElement
  );

  scrollAssistantToBottom();
}


/**
 * Exibe uma animação simples enquanto
 * o assistente prepara a resposta.
 */

function addTypingIndicator() {
  if (!assistantConversation) {
    return null;
  }

  const typingElement =
    document.createElement("div");

  typingElement.className =
    "assistant-message assistant-message--bot assistant-message--typing";

  typingElement.innerHTML = `
    <div class="assistant-message__avatar">
      <i class="fa-solid fa-sun"></i>
    </div>

    <div class="assistant-message__content">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;

  assistantConversation.appendChild(
    typingElement
  );

  scrollAssistantToBottom();

  return typingElement;
}


/**
 * Cria o botão complementar da resposta.
 */

function createAssistantAction(actionType) {
  if (actionType === "purchase") {
    return `
      <a
        class="assistant-message__action"
        href="${escapeHtml(SITE_CONFIG.purchaseUrl)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Comprar ingresso
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    `;
  }

  if (actionType === "whatsapp") {
    const encodedMessage =
      encodeURIComponent(
        SITE_CONFIG.whatsappMessage
      );

    const separator =
      SITE_CONFIG.whatsappUrl.includes("?")
        ? "&"
        : "?";

    const whatsappLink =
      `${SITE_CONFIG.whatsappUrl}${separator}text=${encodedMessage}`;

    return `
      <a
        class="assistant-message__action assistant-message__action--whatsapp"
        href="${escapeHtml(whatsappLink)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa-brands fa-whatsapp"></i>
        Falar com a equipe
      </a>
    `;
  }

  return "";
}


/**
 * Adiciona uma resposta do assistente.
 */

function addAssistantMessage(response) {
  if (!assistantConversation || !response) {
    return;
  }

  const messageElement =
    document.createElement("div");

  messageElement.className =
    "assistant-message assistant-message--bot";

  const actionHtml =
    createAssistantAction(
      response.action
    );

  messageElement.innerHTML = `
    <div class="assistant-message__avatar">
      <i class="fa-solid fa-sun"></i>
    </div>

    <div class="assistant-message__content">
      ${
        response.title
          ? `<strong>${escapeHtml(response.title)}</strong>`
          : ""
      }

      <p>${escapeHtml(response.answer)}</p>

      ${actionHtml}
    </div>
  `;

  assistantConversation.appendChild(
    messageElement
  );

  scrollAssistantToBottom();

  announceToScreenReader(
    response.answer
  );
}


/**
 * Mostra a resposta após um pequeno intervalo,
 * deixando a conversa mais natural.
 */

function showAssistantResponse(response) {
  const typingElement =
    addTypingIndicator();

  window.setTimeout(() => {
    typingElement?.remove();

    addAssistantMessage(response);
  }, 550);
}


/* =========================================================
   IDENTIFICAÇÃO DA PERGUNTA DIGITADA
   ========================================================= */

/**
 * Procura uma resposta com base nas palavras
 * utilizadas pelo visitante.
 */

function findAssistantResponse(question) {
  const normalizedQuestion =
    normalizeText(question);

  if (!normalizedQuestion) {
    return null;
  }

  let bestResponseKey = null;
  let bestScore = 0;

  ASSISTANT_KEYWORDS.forEach((group) => {
    let groupScore = 0;

    group.keywords.forEach((keyword) => {
      const normalizedKeyword =
        normalizeText(keyword);

      if (
        normalizedQuestion.includes(
          normalizedKeyword
        )
      ) {
        /*
          Expressões maiores recebem uma pontuação maior.
        */

        const keywordWordCount =
          normalizedKeyword
            .split(" ")
            .filter(Boolean)
            .length;

        groupScore +=
          keywordWordCount > 1
            ? keywordWordCount * 3
            : 1;
      }
    });

    if (groupScore > bestScore) {
      bestScore = groupScore;
      bestResponseKey = group.response;
    }
  });

  if (!bestResponseKey || bestScore === 0) {
    return null;
  }

  return ASSISTANT_RESPONSES[
    bestResponseKey
  ];
}


/**
 * Resposta utilizada quando nenhuma
 * informação é encontrada.
 */

function getFallbackResponse() {
  return {
    title: "Não encontrei essa resposta",
    answer:
      "Ainda não consegui entender essa dúvida. Você pode tentar escrever de outra forma ou falar diretamente com a equipe do Curupy pelo WhatsApp.",
    action: "whatsapp"
  };
}


/**
 * Processa uma pergunta digitada ou selecionada.
 */

function processAssistantQuestion(
  question,
  predefinedResponseKey = null
) {
  const cleanQuestion =
    String(question).trim();

  if (!cleanQuestion) {
    return;
  }

  addUserMessage(cleanQuestion);

  const response =
    predefinedResponseKey
      ? ASSISTANT_RESPONSES[
          predefinedResponseKey
        ]
      : findAssistantResponse(
          cleanQuestion
        );

  showAssistantResponse(
    response || getFallbackResponse()
  );
}


/* =========================================================
   SUGESTÕES RÁPIDAS
   ========================================================= */

function configureAssistantSuggestions() {
  assistantQuestionButtons.forEach(
    (button) => {
      button.addEventListener("click", () => {
        const responseKey =
          button.dataset.assistantQuestion;

        if (!responseKey) {
          return;
        }

        const questionText =
          button.textContent.trim();

        processAssistantQuestion(
          questionText,
          responseKey
        );
      });
    }
  );
}


/* =========================================================
   FORMULÁRIO DO ASSISTENTE
   ========================================================= */

function configureAssistantForm() {
  if (!assistantForm || !assistantInput) {
    return;
  }

  assistantForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const question =
        assistantInput.value.trim();

      if (!question) {
        assistantInput.focus();

        announceToScreenReader(
          "Digite uma pergunta antes de enviar."
        );

        return;
      }

      processAssistantQuestion(question);

      assistantInput.value = "";
      assistantInput.focus();
    }
  );
}


/* =========================================================
   NAVEGAÇÃO SUAVE
   ========================================================= */

function configureInternalLinks() {
  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );

  internalLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const targetSelector =
          link.getAttribute("href");

        if (!targetSelector) {
          return;
        }

        let targetElement;

        try {
          targetElement =
            document.querySelector(
              targetSelector
            );
        } catch (error) {
          return;
        }

        if (!targetElement) {
          return;
        }

        event.preventDefault();

        scrollToElement(
          targetElement,
          isMobileScreen() ? 78 : 92
        );
      }
    );
  });
}


/* =========================================================
   ANIMAÇÕES DE ENTRADA
   ========================================================= */

function configureScrollAnimations() {
  const animatedElements =
    document.querySelectorAll(`
      .section-heading,
      .info-card,
      .quick-info__alert,
      .offer__content,
      .offer__experience-image,
      .step-card,
      .steps__action,
      .final-cta__content,
      .final-cta__image
    `);

  if (
    !animatedElements.length ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (prefersReducedMotion) {
    return;
  }

  animatedElements.forEach(
    (element, index) => {
      element.style.opacity = "0";

      element.style.transform =
        "translateY(22px)";

      element.style.transition =
        "opacity 650ms ease, transform 650ms cubic-bezier(.22, 1, .36, 1)";

      const delay =
        Math.min(
          (index % 4) * 60,
          180
        );

      element.style.transitionDelay =
        `${delay}ms`;
    }
  );

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

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.1,
        rootMargin:
          "0px 0px -45px 0px"
      }
    );

  animatedElements.forEach(
    (element) => {
      animationObserver.observe(
        element
      );
    }
  );
}


/* =========================================================
   DESTACAR SEÇÃO ATIVA NO RODAPÉ
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

        if (!selector) {
          return null;
        }

        try {
          return document.querySelector(
            selector
          );
        } catch (error) {
          return null;
        }
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

          navigationLinks.forEach(
            (link) => {
              const isActive =
                link.getAttribute("href") ===
                currentId;

              link.classList.toggle(
                "is-active",
                isActive
              );
            }
          );
        });
      },
      {
        rootMargin:
          "-38% 0px -52% 0px",
        threshold: 0
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


/* =========================================================
   ACESSIBILIDADE
   ========================================================= */

function configureAccessibility() {
  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  externalLinks.forEach((link) => {
    const currentLabel =
      link.getAttribute("aria-label");

    if (!currentLabel) {
      return;
    }

    if (
      currentLabel.includes(
        "Abre em uma nova aba"
      )
    ) {
      return;
    }

    link.setAttribute(
      "aria-label",
      `${currentLabel}. Abre em uma nova aba.`
    );
  });


  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      const assistantIsOpen =
        assistantPanel?.classList.contains(
          "is-open"
        );

      if (assistantIsOpen) {
        closeAssistant();
      }
    }
  );


  /*
    Mantém o foco dentro do assistente
    quando ele estiver aberto.
  */

  assistantPanel?.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements =
        assistantPanel.querySelectorAll(`
          button:not([disabled]),
          input:not([disabled]),
          a[href],
          [tabindex]:not([tabindex="-1"])
        `);

      const visibleFocusableElements =
        Array.from(focusableElements).filter(
          (element) =>
            element.offsetParent !== null
        );

      if (
        visibleFocusableElements.length === 0
      ) {
        return;
      }

      const firstElement =
        visibleFocusableElements[0];

      const lastElement =
        visibleFocusableElements[
          visibleFocusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  );
}


/* =========================================================
   VALIDAÇÃO DAS CONFIGURAÇÕES
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


let resizeTimeout;

function handlePageResize() {
  window.clearTimeout(
    resizeTimeout
  );

  resizeTimeout =
    window.setTimeout(() => {
      updateMobilePurchaseBar();

      /*
        Em telas grandes, garante que o fundo
        não permaneça bloqueado indevidamente.
      */

      if (
        !isMobileScreen() &&
        !assistantPanel?.classList.contains(
          "is-open"
        )
      ) {
        document.body.classList.remove(
          "assistant-is-open"
        );
      }
    }, 150);
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function initializePage() {
  validateSiteConfig();

  configurePurchaseLinks();
  configureWhatsappLinks();

  updateCurrentYear();

  configureInternalLinks();

  configureAssistantPanel();
  configureAssistantSuggestions();
  configureAssistantForm();

  configureScrollAnimations();
  configureSectionObserver();
  configureAccessibility();

  updateHeaderOnScroll();
  updateMobilePurchaseBar();

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
  Aguarda o carregamento completo do HTML.
*/

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializePage
  );
} else {
  initializePage();
}
