import { http, HttpResponse } from "msw";
import { INTIAL_CARDS_ALIGNMENT } from "../common/contants";

export const handlers = [
  http.get("/api/cards", () => {
    const getCards = localStorage.getItem("cards");
    if (!getCards) {
      localStorage.setItem("cards", JSON.stringify(INTIAL_CARDS_ALIGNMENT));
    }
    return HttpResponse.json(getCards ?? "");
  }),
  http.put("/api/cards", async ({ request }) => {
    const requestedBody = await request.json();
    const stringifyBody = JSON.stringify(requestedBody);
    localStorage.setItem("cards", stringifyBody);
    return HttpResponse.json(JSON.stringify(requestedBody));
  }),
];
