# Projecto JM Tech

## 1. Sobre o projeto

Este repositório contém um **portfolio frontend moderno**, desenvolvido com foco em **qualidade visual, boas práticas de código e clareza arquitetural**, pensado para **avaliação por recrutadores e equipes técnicas**.

### Objetivo
Demonstrar competências técnicas em **React**, **Vite**, **EmailJS** e **serverless functions**, não construir um sistema de produção.

### Principais prioridades
- Clareza e organização do código  
- Componentes reutilizáveis  
- Qualidade de UI/UX  
- Uso consciente de bibliotecas modernas  
- Decisões técnicas fundamentadas  

### Tecnologias e funcionalidades
- **Frontend:** React com componentes reutilizáveis  
- **Backend:** Serverless functions na Vercel  
- **Formulário de contato:** EmailJS para envio de emails  
- **Segurança:** ReCAPTCHA invisível v3, sanitização e validação  
- **Feedback:** Modal moderno + spinner de carregamento  
- **Armazenamento:** Mensagens salvas em MySQL/Postgres  
- **Tracking:** Cada mensagem recebe um `tracking_id` único  

---

## 2. Estrutura de arquivos

```text
project/
├─ api/
│  └─ send-email-sql.js      # Função serverless Vercel
├─ components/
│  ├─ Footer/
│  │  ├─ Components/
│  │  │  ├─ ContactForm.jsx
│  │  │  ├─ ContactCard.jsx
│  │  │  └─ SocialLinks.jsx
│  │  └─ footer.sass
├─ pages/
│  └─ ContactPage.jsx
├─ Header/
│  └─ Header.jsx
├─ contact.sass
├─ contactform.sass
└─ README.md


