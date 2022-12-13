import fs from "fs";

const navComponent = fs.readFileSync("./public/components/navbar.html").toString();
const footerComponent = fs.readFileSync("./public/components/footer.html").toString();

export function createPage(path, options = {}) {
    const page = fs.readFileSync("./public/pages/"+path).toString();

    return page
    .replace("%%PAGE_CSS_LINK%%",
        options.cssLink || ""
        )
    ;
}