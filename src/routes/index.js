import userRouters from "./user.routes.js";
import articleRouters from "./article.routes.js";
import booksRouters from "./books.routes.js";
import eventRouters from "./events.routes.js";
import contactRouters from "./contact.routes.js"


export const routesPath = [
    { path: "/api/auth", router: userRouters },
    { path: "/api", router: articleRouters },
    { path: "/api", router: booksRouters },
    { path: "/api", router: eventRouters },
    { path: "/api", router: contactRouters },
];