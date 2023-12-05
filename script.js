const generate = () => {
  // 스타일 동적으로 추가
  var style = document.createElement("style");
  style.textContent = `
    .toc-list ul, li {
        list-style: none;
        padding: 0;
    }

    .toc-list div {
      display: flex;
    }

    .toc-link {
        text-decoration: none;
        color: #333;
        transition: color 0.3s ease;
        display: block; /* Make the entire block clickable */
        font-size: 1em; /* Style for h2 */
        margin-bottom: 0.5em; /* Style for h2 */
    }

    .toc-link:hover {
        color: #007bff;
    }

    .toc-link.sub-item,
    .toc-link.sub-sub-item {
        font-size: 0.82em; /* Style for h3 and h4 */
        margin-left: 1em; /* Style for h3 and h4 */
        margin-bottom: 0.3em; /* Style for h3 and h4 */
    }

    .toggle-btn {
        cursor: pointer;
        margin-right: 0.5em;
        display: inline-block;
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

  var tocList = document.createElement("ul");
  tocList.className = "toc-list";

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
                ? `<span class="toggle-btn" onclick="toggleChildren(this)">▶</span>`
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

  tocContainer.prepend(tocList);
}

function toggleChildren(btn) {
  var sublist = btn.parentElement.nextElementSibling;
  if (sublist.classList.contains("hidden")) {
    sublist.classList.remove("hidden");
    btn.innerText = "▼";
  } else {
    sublist.classList.add("hidden");
    btn.innerText = "▶";
  }
}

generate();
