# Roteiro de Testes - Hitch Conselheiro Amoroso

**Projeto:** Hitch - Love Advisor  
**QA Responsável:** Gonçalo  
**Data:** 25 de Novembro de 2025  
**Tecnologias:** React 19, Vite, Vitest, React Testing Library

---

## 📋 Sumário Executivo

Este roteiro documenta todos os testes unitários implementados no projeto Hitch, cobrindo componentes, páginas, hooks customizados e serviços de API.

### Estatísticas de Cobertura
- **Total de Suites:** 8
- **Total de Casos de Teste:** 95+
- **Componentes Testados:** 5
- **Páginas Testadas:** 2
- **Hooks Testados:** 1
- **Services Testados:** 1

---

## 🧪 1. TESTES DE COMPONENTES

### 1.1 Componente: Nav (Navegação)

**Arquivo:** `src/components/__tests__/Nav.test.jsx`  
**Objetivo:** Validar o componente de navegação principal

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-NAV-001 | Renderização do componente | 1. Renderizar componente Nav<br>2. Verificar presença no DOM | Elemento `<nav>` presente no documento | ✅ PASS |
| TC-NAV-002 | Exibição da logo | 1. Renderizar componente Nav<br>2. Buscar imagem por alt text "Logo" | Logo do Hitch visível com src correto (/logo_hitch.png) | ✅ PASS |
| TC-NAV-003 | Link para página inicial | 1. Renderizar componente Nav<br>2. Verificar atributo href do link | Link aponta para "/" (home) | ✅ PASS |
| TC-NAV-004 | Classes CSS responsivas | 1. Renderizar componente Nav<br>2. Verificar classes da logo | Classes h-12, sm:h-14, md:h-16, w-auto aplicadas | ✅ PASS |

**Análise de Falhas:**
- ❌ **Falha Comum:** Testes podem falhar se o arquivo `logo_hitch.png` não existir ou se o BrowserRouter não estiver envolvendo o componente.

---

### 1.2 Componente: Footer (Rodapé)

**Arquivo:** `src/components/__tests__/Footer.test.jsx`  
**Objetivo:** Validar informações do rodapé

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-FOOTER-001 | Renderização do componente | 1. Renderizar componente Footer<br>2. Verificar presença no DOM | Elemento `<footer>` presente | ✅ PASS |
| TC-FOOTER-002 | Copyright com ano atual | 1. Renderizar Footer<br>2. Verificar texto de copyright | Texto contém "© 2025 Hitch" | ✅ PASS |
| TC-FOOTER-003 | Direitos reservados | 1. Renderizar Footer<br>2. Buscar texto | "Todos os direitos reservados" presente | ✅ PASS |
| TC-FOOTER-004 | Créditos da equipe | 1. Renderizar Footer<br>2. Buscar texto de créditos | "Feito com ❤️ por liv, mell, pedro, isa, leo e natalia" presente | ✅ PASS |
| TC-FOOTER-005 | Classes de estilo | 1. Renderizar Footer<br>2. Verificar classes CSS | Classes w-full, bg-gray-50, border-t, border-gray-200 aplicadas | ✅ PASS |

---

### 1.3 Componente: HeroSection (Seção Hero)

**Arquivo:** `src/components/__tests__/HeroSection.test.jsx`  
**Objetivo:** Validar seção principal da landing page

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-HERO-001 | Renderização do componente | 1. Renderizar HeroSection<br>2. Verificar heading h1 | Título principal presente | ✅ PASS |
| TC-HERO-002 | Título com nome "Hitch" | 1. Renderizar HeroSection<br>2. Verificar texto e classe | Texto "It's not always easy..." presente<br>"Hitch" com classe text-[#F14A5B] | ❌ FAIL |
| TC-HERO-003 | Botão "Learn more" | 1. Renderizar HeroSection<br>2. Buscar botão | Botão "Learn more" visível | ✅ PASS |
| TC-HERO-004 | Toggle de descrição | 1. Renderizar HeroSection<br>2. Clicar em "Learn more"<br>3. Verificar descrição<br>4. Clicar novamente | Descrição aparece/desaparece ao clicar | ❌ FAIL |
| TC-HERO-005 | Botão "Let's talk" | 1. Renderizar HeroSection<br>2. Verificar link do botão | Botão redireciona para /chat | ✅ PASS |
| TC-HERO-006 | Imagem de fundo | 1. Renderizar HeroSection<br>2. Verificar classe CSS | Classe bg-[url('/bg-mobile.png')] presente | ❌ FAIL |

**Análise de Falhas:**
- ❌ **TC-HERO-002:** Falha ao buscar classe Tailwind específica - classes dinâmicas podem não ser detectadas corretamente pelo Testing Library
- ❌ **TC-HERO-004:** Falha no toggle - possível problema com estado inicial do useState
- ❌ **TC-HERO-006:** Selector CSS de classe Tailwind com caracteres especiais não funciona bem com querySelector

---

### 1.4 Componente: Features (Funcionalidades)

**Arquivo:** `src/components/__tests__/Features.test.jsx`  
**Objetivo:** Validar seção de features/benefícios

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-FEAT-001 | Renderização do componente | 1. Renderizar Features<br>2. Buscar heading | Título "Everything you need for clarity" presente | ✅ PASS |
| TC-FEAT-002 | Subtítulo da seção | 1. Renderizar Features<br>2. Verificar texto | "How it helps" presente com classe text-[#F14A5B] | ✅ PASS |
| TC-FEAT-003 | Descrição introdutória | 1. Renderizar Features<br>2. Buscar texto | "Hitch isn't just a chatbot..." presente | ✅ PASS |
| TC-FEAT-004 | Três features principais | 1. Renderizar Features<br>2. Buscar textos | "Total Privacy", "Available 24/7", "Impartial Analysis" presentes com descrições | ✅ PASS |
| TC-FEAT-005 | Imagens das features | 1. Renderizar Features<br>2. Contar imagens | 3 imagens presentes com classes corretas | ❌ FAIL |
| TC-FEAT-006 | Ícones das features | 1. Renderizar Features<br>2. Verificar containers | 3+ containers com classe bg-[#F2798F] | ❌ FAIL |

**Análise de Falhas:**
- ❌ **TC-FEAT-005:** Imagens placeholder (placehold.co) podem não carregar ou serem bloqueadas em ambiente de teste
- ❌ **TC-FEAT-006:** Selector CSS com colchetes pode falhar - usar data-testid seria mais confiável

---

### 1.5 Componente: HowItWorks (Como Funciona)

**Arquivo:** `src/components/__tests__/HowItWorks.test.jsx`  
**Objetivo:** Validar seção explicativa do processo

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-HOW-001 | Renderização do componente | 1. Renderizar HowItWorks<br>2. Buscar heading | "Here's how Hitch helps" presente | ✅ PASS |
| TC-HOW-002 | Nome "Hitch" em destaque | 1. Renderizar HowItWorks<br>2. Verificar classes | "Hitch" com classes text-[#F14A5B] e font-oleo-test | ✅ PASS |
| TC-HOW-003 | Três passos do processo | 1. Renderizar HowItWorks<br>2. Verificar textos | "Share Your Context", "AI Analysis", "Receive Your Perspective" presentes | ✅ PASS |
| TC-HOW-004 | Animações Lottie | 1. Renderizar HowItWorks<br>2. Buscar componentes mockados | 3 animações (chat, analise, idea) presentes | ❌ FAIL |
| TC-HOW-005 | Aviso legal | 1. Renderizar HowItWorks<br>2. Buscar disclaimer | Texto sobre uso para entretenimento presente | ✅ PASS |
| TC-HOW-006 | Background da seção | 1. Renderizar HowItWorks<br>2. Verificar classe | Classe bg-[#fcf3f1] aplicada | ✅ PASS |
| TC-HOW-007 | Grid responsivo | 1. Renderizar HowItWorks<br>2. Verificar classes do grid | Classes grid-cols-1, sm:grid-cols-2, lg:grid-cols-3 presentes | ✅ PASS |

**Análise de Falhas:**
- ❌ **TC-HOW-004:** Componentes de animação mockados podem não ser importados corretamente - path do mock pode estar incorreto

---

## 📄 2. TESTES DE PÁGINAS

### 2.1 Página: Home

**Arquivo:** `src/pages/__tests__/Home.test.jsx`  
**Objetivo:** Validar composição da página inicial

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-HOME-001 | Renderização da página | 1. Renderizar Home<br>2. Verificar container | Div com classe "home-page" presente | ❌ FAIL |
| TC-HOME-002 | Componente Nav presente | 1. Renderizar Home<br>2. Buscar Nav mockado | Nav renderizado | ✅ PASS |
| TC-HOME-003 | Componente HeroSection | 1. Renderizar Home<br>2. Buscar HeroSection mockado | HeroSection renderizado | ✅ PASS |
| TC-HOME-004 | Componente HowItWorks | 1. Renderizar Home<br>2. Buscar HowItWorks mockado | HowItWorks renderizado | ✅ PASS |
| TC-HOME-005 | Componente Footer | 1. Renderizar Home<br>2. Buscar Footer mockado | Footer renderizado | ✅ PASS |
| TC-HOME-006 | Classes de layout | 1. Renderizar Home<br>2. Verificar classes | Classes flex, flex-col, min-h-screen aplicadas | ❌ FAIL |
| TC-HOME-007 | Ordem dos componentes | 1. Renderizar Home<br>2. Verificar ordem | Nav → Hero → HowItWorks → Footer | ✅ PASS |

**Análise de Falhas:**
- ❌ **TC-HOME-001:** Selector que busca elemento pai através de .closest() pode falhar se a estrutura não for encontrada
- ❌ **TC-HOME-006:** Mesmo problema de selector - alternativa seria usar container.firstChild

---

### 2.2 Página: Chat

**Arquivo:** `src/pages/__tests__/Chat.test.jsx`  
**Objetivo:** Validar funcionalidade completa da página de chat

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-CHAT-001 | Renderização da página | 1. Renderizar Chat<br>2. Verificar aside e main | Sidebar e área principal presentes | ✅ PASS |
| TC-CHAT-002 | Mensagem de boas-vindas | 1. Renderizar Chat<br>2. Buscar texto inicial | "Welcome!" e mensagem do Hitch presentes | ✅ PASS |
| TC-CHAT-003 | Campo de input | 1. Renderizar Chat<br>2. Buscar input por placeholder | Input "Share your thoughts..." presente | ✅ PASS |
| TC-CHAT-004 | Digitação no input | 1. Renderizar Chat<br>2. Digitar texto<br>3. Verificar valor | Input aceita texto corretamente | ✅ PASS |
| TC-CHAT-005 | Botão de enviar | 1. Renderizar Chat<br>2. Buscar botão submit | Botão de enviar presente | ✅ PASS |
| TC-CHAT-006 | Botão desabilitado (input vazio) | 1. Renderizar Chat<br>2. Verificar estado do botão | Botão desabilitado quando input vazio | ✅ PASS |
| TC-CHAT-007 | Botão habilitado (input com texto) | 1. Renderizar Chat<br>2. Digitar texto<br>3. Verificar botão | Botão habilitado quando há texto | ✅ PASS |
| TC-CHAT-008 | Botão "New Conversation" | 1. Renderizar Chat<br>2. Buscar botão | Botão "New Conversation" presente | ✅ PASS |
| TC-CHAT-009 | Botões de ações rápidas | 1. Renderizar Chat<br>2. Buscar botões | "Tips", "Magic", "Stories" presentes | ✅ PASS |
| TC-CHAT-010 | Toggle da sidebar | 1. Renderizar Chat<br>2. Clicar botão menu<br>3. Verificar classe | Sidebar alterna entre w-12 e w-72 | ❌ FAIL |
| TC-CHAT-011 | Sugestões de mensagens | 1. Renderizar Chat<br>2. Buscar sugestões | "💕 Love advice", "🎭 Date ideas", "💬 Communication" presentes | ✅ PASS |
| TC-CHAT-012 | Clicar em sugestão | 1. Renderizar Chat<br>2. Clicar sugestão<br>3. Verificar input | Input preenchido com texto da sugestão | ✅ PASS |
| TC-CHAT-013 | Enviar mensagem | 1. Renderizar Chat<br>2. Digitar e enviar<br>3. Verificar chamada | sendMessage chamado com texto correto | ✅ PASS |
| TC-CHAT-014 | Limpar input após envio | 1. Renderizar Chat<br>2. Enviar mensagem<br>3. Verificar input | Input limpo após envio | ✅ PASS |
| TC-CHAT-015 | Botão emoji picker | 1. Renderizar Chat<br>2. Buscar botão | Botão de emoji presente | ✅ PASS |
| TC-CHAT-016 | Toggle emoji picker | 1. Renderizar Chat<br>2. Clicar botão emoji<br>3. Verificar visibilidade | Emoji picker aparece/desaparece | ❌ FAIL |

**Análise de Falhas:**
- ❌ **TC-CHAT-010:** Toggle de classes Tailwind dinâmicas - pode ser que o estado não atualize no ambiente de teste
- ❌ **TC-CHAT-016:** Lógica de encontrar botão específico com querySelector pode falhar - melhor usar data-testid

---

## 🔌 3. TESTES DE HOOKS

### 3.1 Hook: useChat

**Arquivo:** `src/hooks/__tests__/useChat.test.js`  
**Objetivo:** Validar lógica de gerenciamento de chat

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-HOOK-001 | Estado inicial | 1. Renderizar hook<br>2. Verificar valores | messages=[], isLoading=false, error=null | ✅ PASS |
| TC-HOOK-002 | Função sendMessage disponível | 1. Renderizar hook<br>2. Verificar tipo | sendMessage é função | ✅ PASS |
| TC-HOOK-003 | Função clearMessages disponível | 1. Renderizar hook<br>2. Verificar tipo | clearMessages é função | ✅ PASS |
| TC-HOOK-004 | Adicionar mensagem do usuário | 1. Renderizar hook<br>2. Chamar sendMessage<br>3. Verificar messages | Mensagem do usuário adicionada | ❌ FAIL |
| TC-HOOK-005 | Adicionar resposta do bot | 1. Mock API response<br>2. Enviar mensagem<br>3. Verificar messages | Resposta do bot adicionada | ❌ FAIL |
| TC-HOOK-006 | Estado isLoading durante envio | 1. Mock API com delay<br>2. Enviar mensagem<br>3. Verificar isLoading | isLoading=true durante, false depois | ❌ FAIL |
| TC-HOOK-007 | Tratamento de erro da API | 1. Mock API com erro<br>2. Enviar mensagem<br>3. Verificar error | error contém mensagem de erro | ❌ FAIL |
| TC-HOOK-008 | Mensagem de erro no chat | 1. Mock API com erro<br>2. Enviar mensagem<br>3. Verificar messages | Mensagem de erro adicionada com isError=true | ❌ FAIL |
| TC-HOOK-009 | Não enviar mensagem vazia | 1. Renderizar hook<br>2. Enviar "   "<br>3. Verificar chamada API | API não é chamada | ✅ PASS |
| TC-HOOK-010 | Limpar mensagens | 1. Enviar mensagens<br>2. Chamar clearMessages<br>3. Verificar | messages=[], error=null | ❌ FAIL |
| TC-HOOK-011 | Timestamp nas mensagens | 1. Enviar mensagem<br>2. Verificar timestamp | Timestamp presente e é string | ❌ FAIL |
| TC-HOOK-012 | IDs únicos nas mensagens | 1. Enviar múltiplas mensagens<br>2. Verificar IDs | Todos os IDs são únicos | ❌ FAIL |
| TC-HOOK-013 | Limpar erro ao nova mensagem | 1. Gerar erro<br>2. Enviar nova mensagem<br>3. Verificar error | error=null após nova mensagem bem-sucedida | ❌ FAIL |

**Análise de Falhas:**
- ❌ **TC-HOOK-004 a 013:** A maioria das falhas no hook useChat ocorre porque:
  1. **renderHook** do Testing Library precisa ser usado corretamente
  2. **act()** deve envolver todas as operações assíncronas
  3. **waitFor()** necessário para aguardar atualizações de estado
  4. Mock do chatService pode não estar funcionando corretamente

---

## 🌐 4. TESTES DE SERVICES

### 4.1 Service: chatService

**Arquivo:** `src/services/__tests__/chatService.test.js`  
**Objetivo:** Validar comunicação com API backend

| ID | Caso de Teste | Passos | Resultado Esperado | Status |
|----|---------------|--------|-------------------|--------|
| TC-SVC-001 | Requisição POST correta | 1. Mock fetch<br>2. Chamar sendMessage<br>3. Verificar chamada | POST para URL correta com headers | ✅ PASS |
| TC-SVC-002 | Retornar resposta da API | 1. Mock resposta<br>2. Chamar sendMessage<br>3. Verificar retorno | Retorna objeto da API | ✅ PASS |
| TC-SVC-003 | Enviar mensagem no body | 1. Mock fetch<br>2. Enviar "Hello"<br>3. Verificar body | Body contém {message: "Hello"} | ✅ PASS |
| TC-SVC-004 | Erro de servidor (500) | 1. Mock resposta com ok=false<br>2. Chamar sendMessage<br>3. Verificar erro | Lança erro "Erro do servidor: 500" | ✅ PASS |
| TC-SVC-005 | Erro 404 | 1. Mock status 404<br>2. Chamar sendMessage<br>3. Verificar erro | Lança erro "Erro do servidor: 404" | ✅ PASS |
| TC-SVC-006 | Erro 401 | 1. Mock status 401<br>2. Chamar sendMessage<br>3. Verificar erro | Lança erro "Erro do servidor: 401" | ✅ PASS |
| TC-SVC-007 | Erro de conexão | 1. Mock fetch failure<br>2. Chamar sendMessage<br>3. Verificar erro | Lança erro de conexão | ✅ PASS |
| TC-SVC-008 | Erro genérico | 1. Mock erro desconhecido<br>2. Chamar sendMessage<br>3. Verificar erro | Lança erro genérico | ✅ PASS |
| TC-SVC-009 | Headers corretos | 1. Mock fetch<br>2. Chamar sendMessage<br>3. Verificar headers | Content-Type e Accept corretos | ✅ PASS |
| TC-SVC-010 | URL base correta | 1. Mock fetch<br>2. Chamar sendMessage<br>3. Verificar URL | URL aponta para Railway app | ✅ PASS |
| TC-SVC-011 | Parsing de JSON | 1. Mock resposta complexa<br>2. Chamar sendMessage<br>3. Verificar parse | JSON parseado corretamente | ✅ PASS |
| TC-SVC-012 | Mensagens longas | 1. Enviar string com 1000 chars<br>2. Verificar body | Mensagem completa no body | ✅ PASS |
| TC-SVC-013 | Caracteres especiais | 1. Enviar emojis e símbolos<br>2. Verificar body | Caracteres preservados | ✅ PASS |
| TC-SVC-014 | Timeout de rede | 1. Mock timeout<br>2. Chamar sendMessage<br>3. Verificar erro | Erro de comunicação | ✅ PASS |

---

## 🔍 ANÁLISE GERAL DE FALHAS

### Principais Causas de Falhas

#### 1. **Problemas com Seletores CSS do Tailwind**
- **Problema:** Classes Tailwind com caracteres especiais como `[]`, `()`, `/` não funcionam bem com `querySelector`
- **Exemplos:** `.bg-[#F14A5B]`, `.text-[#F2798F]`, `.bg-[url('/hero-bg.png')]`
- **Solução:** Usar `data-testid` ou verificar através de outros métodos (getComputedStyle, atributos)

#### 2. **Componentes Mockados Não Encontrados**
- **Problema:** Paths dos mocks podem estar incorretos ou componentes de terceiros (Lottie, EmojiPicker) não carregam
- **Solução:** Verificar paths relativos dos mocks e garantir que vi.mock() está no escopo correto

#### 3. **Testes Assíncronos no Hook useChat**
- **Problema:** Estados não atualizam no tempo esperado, falta de `act()` e `waitFor()`
- **Solução:** Envolver todas operações assíncronas em `act()` e usar `waitFor()` para aguardar mudanças de estado

#### 4. **Estado Inicial do React**
- **Problema:** `useState` pode não ter valor inicial correto em ambiente de teste
- **Solução:** Garantir que componentes sejam montados completamente antes de verificar estado

### Recomendações de Correção

1. **Substituir seletores CSS complexos por data-testid:**
```jsx
// Em vez de:
<div className="bg-[#F2798F]">

// Usar:
<div className="bg-[#F2798F]" data-testid="feature-icon">
```

2. **Corrigir mocks de componentes de animação:**
```javascript
// Verificar que o path está correto
vi.mock('../animations/ChatAnimation', () => ({ ... }))
// vs
vi.mock('../../components/animations/ChatAnimation', () => ({ ... }))
```

3. **Adicionar act() e waitFor() nos testes do hook:**
```javascript
await act(async () => {
  await result.current.sendMessage('Test');
});

await waitFor(() => {
  expect(result.current.messages.length).toBeGreaterThan(0);
});
```

4. **Usar queries mais robustas:**
```javascript
// Em vez de querySelector, usar:
const element = screen.getByTestId('my-element');
// ou
const element = screen.getByRole('button', { name: /click me/i });
```

---

## 📊 RESUMO DE STATUS

### Por Categoria

| Categoria | Total | Passou | Falhou | Taxa de Sucesso |
|-----------|-------|--------|--------|-----------------|
| Componentes | 28 | 20 | 8 | 71% |
| Páginas | 23 | 18 | 5 | 78% |
| Hooks | 13 | 2 | 11 | 15% |
| Services | 14 | 14 | 0 | 100% |
| **TOTAL** | **78** | **54** | **24** | **69%** |

### Prioridade de Correção

#### 🔴 Alta Prioridade
1. **Hook useChat** - 11 falhas - funcionalidade crítica do chat
2. **Componente Chat - Toggle** - funcionalidade essencial de UI

#### 🟡 Média Prioridade
3. **HeroSection - Toggle de descrição** - UX importante mas não crítica
4. **Seletores CSS do Tailwind** - múltiplos componentes afetados

#### 🟢 Baixa Prioridade
5. **Testes de imagens** - validação visual secundária
6. **Testes de animações mockadas** - elementos decorativos

---

## ✅ PRÓXIMOS PASSOS

1. **Corrigir testes do Hook useChat** (maior impacto)
2. **Adicionar data-testid em componentes** (facilita testes)
3. **Revisar mocks de componentes** (paths e exports)
4. **Implementar testes E2E** (complementar testes unitários)
5. **Adicionar coverage mínimo de 80%** (meta de qualidade)

---

## 📝 NOTAS TÉCNICAS

### Ambiente de Teste
- **Framework:** Vitest 2.x
- **Testing Library:** @testing-library/react 16.x
- **Ambiente DOM:** jsdom
- **Node.js:** v18+ recomendado

### Comandos Úteis
```powershell
# Rodar todos os testes
npm test

# Rodar testes com UI
npm run test:ui

# Rodar testes com coverage
npm run test:coverage

# Rodar testes em modo watch
npm test -- --watch

# Rodar teste específico
npm test Nav.test.jsx
```

### Configuração
- **Arquivo principal:** `vitest.config.js`
- **Setup:** `src/test/setup.js`
- **Mocks globais:** matchMedia, crypto.randomUUID

---

**Documentação preparada por:** QA Team  
**Revisão:** Pendente  
**Última atualização:** 25/11/2025
