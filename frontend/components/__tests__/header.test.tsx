import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "../header";
import { useRouter, useSearchParams } from "next/navigation";

beforeEach(() => {
  vi.clearAllMocks();
  window.sessionStorage.clear();
  searchState.query = "";

  vi.mocked(useRouter).mockReturnValue({
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    replace: replaceMock,
    prefetch: vi.fn(),
  });

  vi.mocked(useSearchParams).mockImplementation(
    () => new URLSearchParams(searchState.query) as ReturnType<typeof useSearchParams>,
  );

  // Keep the existing listPublicListings mock setup.
});

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("../BackendHealthCompact", () => ({
  default: () => <div data-testid="backend-health-widget">Backend Health</div>,
}));

vi.mock("../ui/mobile-menu", () => ({
  MobileMenu: () => <div data-testid="mobile-menu" />,
}));

vi.mock("../theme-toggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

vi.mock("../currency-toggle", () => ({
  CurrencyToggle: () => <div data-testid="currency-toggle" />,
}));

vi.mock("../wallet/ConnectWalletButton", () => ({
  ConnectWalletButton: () => <div data-testid="connect-wallet-button" />,
}));

vi.mock("../language-switcher", () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

vi.mock("../layout/NotificationBell", () => ({
  NotificationBell: () => <div data-testid="notification-bell" />,
}));

describe("Header", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("does not render the backend health widget on public pages", () => {
    render(<Header />);

    expect(screen.queryByTestId("backend-health-widget")).not.toBeInTheDocument();
  });
  
});
