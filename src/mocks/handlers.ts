import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "@/config/constants";

const mockUser = {
  id: "usr_1",
  email: "demo@example.com",
  fullName: "Demo Foydalanuvchi",
  role: "USER" as const,
  baseCurrency: "UZS" as const,
  createdAt: new Date().toISOString(),
};

const mockSubscriptions = Array.from({ length: 12 }, (_, i) => ({
  id: `sub_${i + 1}`,
  name: ["Netflix", "Spotify", "YouTube Premium", "iCloud", "Figma", "Notion"][i % 6],
  price: [55000, 42000, 39000, 25000, 12, 8][i % 6],
  currency: (i % 6 >= 4 ? "USD" : "UZS") as "UZS" | "USD",
  category: ["Streaming", "Musiqa", "Bulut", "Dizayn", "Ish"][i % 5],
  billingCycle: "MONTHLY" as const,
  startDate: "2026-01-01",
  nextPaymentDate: new Date(Date.now() + (i % 5) * 86400000).toISOString(),
  status: "ACTIVE" as const,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
}));

export const handlers = [
  http.post(`${API_BASE_URL}/auth/login`, () => {
    return HttpResponse.json({
      user: mockUser,
      tokens: { accessToken: "mock_access_token", refreshToken: "mock_refresh_token" },
    });
  }),

  http.get(`${API_BASE_URL}/auth/me`, () => {
    return HttpResponse.json(mockUser);
  }),

  http.post(`${API_BASE_URL}/auth/logout`, () => {
    return HttpResponse.json({ message: "Logged out successfully" });
  }),

  http.post(`${API_BASE_URL}/auth/refresh`, () => {
    return HttpResponse.json({ accessToken: "mock_refreshed_token" });
  }),

  http.get(`${API_BASE_URL}/subscriptions`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 10);
    const start = (page - 1) * limit;

    return HttpResponse.json({
      items: mockSubscriptions.slice(start, start + limit),
      meta: {
        page,
        limit,
        total: mockSubscriptions.length,
        totalPages: Math.ceil(mockSubscriptions.length / limit),
      },
    });
  }),

  http.get(`${API_BASE_URL}/analytics/summary`, () => {
    return HttpResponse.json({
      totalMonthly: 245000,
      totalYearly: 2940000,
      mostExpensiveSubscription: { id: "sub_1", name: "Netflix", price: 55000 },
      currency: "UZS",
      monthlyBreakdown: [
        { month: "Yan", total: 210000 },
        { month: "Fev", total: 225000 },
        { month: "Mar", total: 245000 },
      ],
      categoryBreakdown: [
        { category: "Streaming", total: 120000, percentage: 49 },
        { category: "Musiqa", total: 60000, percentage: 24 },
        { category: "Bulut", total: 65000, percentage: 27 },
      ],
    });
  }),

  http.get(`${API_BASE_URL}/notifications`, () => {
    return HttpResponse.json([
      {
        id: "notif_1",
        title: "To'lov muddati yaqinlashmoqda",
        message: "Netflix uchun to'lov 2 kundan so'ng amalga oshiriladi",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  }),
];