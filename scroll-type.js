const generate = () => {
  // 스타일 동적으로 추가
  var style = document.createElement("style");
  style.textContent = `
    @media (max-width: 767px) {
      .toc-wrapper {
        display: none;
      }
    }
  
    .gh-content {
      position: relative;
      display: grid;
      width: max-content;
    }
  
    .toc-wrapper {
      position: absolute;
      height: 100%;
      width: 200px;
      right: -200px;
      order: 2;
    }
  
    .toc-list {
      position: sticky;
      top: 150px;
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0;
      border-top: 1px solid rgb(240, 240, 240);
      padding: 6px 0 0;
      gap: 2px;
    }
  
    .toc-list ul, .toc-list li {
      list-style: none;
      padding: 2px 0;
    }
  
    .toc-list ul {
      margin-left: 6px;
    }
  
    .toc-list > li {
      padding: 4px 0 4px 26px;
      border-radius: 2px;
    }
  
    .toc-list > li:hover {
      background: rgb(240, 240, 240);
    }
  
    .toc-list div {
      display: flex;
      align-items: center;
      gap: 2px;
    }
  
    .toc-link {
      color: #333;
      display: block; 
      text-decoration: none !important;
      font-size: 0.82em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.3s ease;
    }
  
    .toc-link:hover {
        color: #007bff;
    }
  
    .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -26px;
      width: 24px;
      height: 20px;
      cursor: pointer;
      font-size: 0.6em;
      background-image: url(https://dddieon.github.io/ghost-blog-list-generator/arrow.svg);
      background-repeat: no-repeat;
      background-size: 12px 12px;
      background-position: center center;
    }
  
    .toggle-btn:not(.close) {
      transform: rotate(180deg);
    }
  
    .hidden {
        display: none;
    }
  `;
  document.head.appendChild(style);
  // TOC 생성
  generateTOC();
};
function generateTOC() {
  var tocContainer = document.querySelector(".gh-content");

  if (!tocContainer) {
    console.error(
      "Content container not found. Please make sure there is an element with the class 'gh-content'."
    );
    return;
  }

  var tocWrapper = document.createElement("div");
  var tocList = document.createElement("ul");
  tocWrapper.className = "toc-wrapper";
  tocList.className = "toc-list";
  tocWrapper.appendChild(tocList);

  var headings = tocContainer.querySelectorAll("h2, h3, h4");

  headings.forEach(function (heading, index) {
    var headingText = heading.textContent;
    var headingId = "toc-" + index;

    heading.setAttribute("id", headingId);

    var listItem = document.createElement("li");
    listItem.innerHTML = `
          <div>
              ${
                heading.tagName === "H2" &&
                headings[index + 1]?.tagName &&
                headings[index + 1]?.tagName !== "H2"
                  ? `<span class="toggle-btn close" onclick="toggleChildren(this)"></span>`
                  : ""
              }
              <a class="toc-link${
                heading.tagName === "H3"
                  ? " sub-item"
                  : heading.tagName === "H4"
                  ? " sub-sub-item"
                  : ""
              }" href="#${headingId}">
                  ${headingText}
              </a>
          </div>
      `;

    if (heading.tagName === "H2") {
      var sublist = document.createElement("ul");
      sublist.className = "hidden";
      listItem.appendChild(sublist);
      tocList.appendChild(listItem);
    } else {
      var lastH2 = tocList.querySelector("li:last-child ul");
      lastH2.appendChild(listItem);
    }
  });

  tocContainer.prepend(tocWrapper);
}

function toggleChildren(btn) {
  var sublist = btn.parentElement.nextElementSibling;
  if (sublist.classList.contains("hidden")) {
    sublist.classList.remove("hidden");
    btn.classList.remove("close");
    // btn.innerText = "▼";
  } else {
    sublist.classList.add("hidden");
    btn.classList.add("close");
    // btn.innerText = "▶";
  }
}

generate();
