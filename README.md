# Avenida Madeiras — Website Oficial

Website institucional e catálogo digital da **Avenida Madeiras**, referência em madeiras nobres, vigamentos pesados, pranchas e eucalipto tratado em Taiobeiras e região do Norte de Minas Gerais.

---

## 🌲 Visão Geral

- **Localização:** Taiobeiras, Minas Gerais, Brasil
- **Endereço:** Av. Bandeirantes, 757 — CEP 39550-000
- **Contato / WhatsApp:** [(38) 99866-2894](https://wa.me/5538998662894)
- **E-mail:** av.madeirasn1@gmail.com
- **Instagram:** [@av_madeiras](https://www.instagram.com/av_madeiras/)
- **CNPJ:** 39.675.740/0001-63

---

## 🚀 Tecnologias & Engenharia

- **Arquitetura Frontend:** HTML5 Semântico, CSS3 Moderno (Custom Properties, Grid & Flexbox), Vanilla JavaScript (ES6 Modules).
- **Acessibilidade Digital:** Em conformidade com as diretrizes **WCAG 2.1/2.2 AA & AAA** (Focus Visible dual-ring, ARIA, suporte a `prefers-reduced-motion: reduce`, contraste elevado).
- **Core Web Vitals & Performance:** Zero dependências externas pesadas, carregamento assíncrono de mídia, `srcset`, `loading="lazy"`, zero CLS.
- **SEO & Schema.org:** Marcação estruturada completa `LocalBusiness` / `LumberStore` para indexação e busca regional.
- **Deploy Contínuo:** GitHub Actions configurado para publicação automática no GitHub Pages a cada push na branch `main`.

---

## 📂 Estrutura de Diretórios

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline de Deploy Automático (GitHub Pages)
├── assets/
│   ├── css/                    # Arquitetura CSS Modular (Tokens, Base, Layout, Componentes, Motion)
│   ├── js/                     # Módulos JavaScript (Header, Form, Scroll Reveal)
│   └── img/                    # Ativos visuais, Logotipo Oficial 3D e Fotos de Projetos
├── favicon/                    # Pacote de ícones PWA e Favicon SVG
├── .gitignore
├── index.html                  # Estrutura semântica principal
├── robots.txt                  # Diretivas para mecanismos de busca
├── sitemap.xml                 # Mapeamento XML de indexação
└── site.webmanifest            # Manifesto PWA
```

---

## ⚡ Como Executar Localmente

Como o projeto é construído em padrões nativos (Vanilla JS / CSS puro), não há necessidade de instalação de dependências ou compilação (`npm install` / `build`).

Basta abrir o arquivo `index.html` em qualquer navegador ou utilizar um servidor local estático:

```bash
# Com Python 3:
python -m http.server 3000

# Ou com VS Code:
# Utilize a extensão "Live Server"
```

---

## 🌐 Deploy Automático

O repositório está configurado com **GitHub Actions** (`.github/workflows/deploy.yml`). 
1. Acesse as configurações do repositório no GitHub: **Settings > Pages**.
2. Em **Source**, selecione **GitHub Actions**.
3. A cada novo `git push origin main`, o site será automaticamente publicado e atualizado.
