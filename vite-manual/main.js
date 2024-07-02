import "@/styles/global.css";
import { btn } from "@/styles/main.module.css";
import { getNode as $ } from "kind-tiger";
import img from "@/assets/8b.jpg";

const app = $("#app");

const h1 = document.createElement("h1");
h1.textContent = "빛 보다 빠른 Vite ⚡️";
h1.classList.add = "heading";

const figure = document.createElement("figure");
figure.innerHTML = `
  <img src="${img}" style="width: 50px;" />
  <button class="${btn}" type="button">버튼</button>
  <figcaption>로고</figcaption>
`;

const fragment = document.createDocumentFragment();

fragment.appendChild(h1);
fragment.appendChild(figure);

app.appendChild(fragment);
