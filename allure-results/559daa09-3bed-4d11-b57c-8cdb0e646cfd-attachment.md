# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\auth.spec.ts >> Authentication Tests >> User can logout successfully
- Location: tests\e2e\auth.spec.ts:30:7

# Error details

```
TimeoutError: page.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid="email-input"]')
    - waiting for navigation to finish...
    - navigated to "https://next.eventim.de/?c=web&e=keykloak1108&ver=javascript-5.0.1&cver=1778762710&man=public-api.eventim.com%20keycloak%20%20&enqueuetoken=eyJ0eXAiOiJRVDEiLCJlbmMiOiJBRVMyNTYiLCJpc3MiOjE3Nzg4NTIxOTE…"
    - waiting for" https://auth.eventim.de/identity/auth/realms/eventim-de/protocol/openid-connect/auth?response_type=code&client_id=web-sso__eventim-de&scope=openid&ui_locales=de+de&redirect_uri=https%3A%2F%2Fwww.even…" navigation to finish...
    - navigated to "https://auth.eventim.de/identity/auth/realms/eventim-de/protocol/openid-connect/auth?response_type=code&client_id=web-sso__eventim-de&scope=openid&ui_locales=de+de&redirect_uri=https%3A%2F%2Fwww.even…"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - dialog "Wir passen dein Erlebnis individuell an" [ref=e2]:
    - document [ref=e3]:
      - generic [ref=e5]:
        - heading "Wir passen dein Erlebnis individuell an" [level=1] [ref=e6]
        - generic [ref=e7]:
          - text: Wir nutzen Cookies und ähnliche Technologien, mit denen eine Speicherung und Zugriff auf Informationen in deinem Endgerät erfolgt, um einen sicheren Betrieb unserer Webseiten zu gewährleisten, komfortable Einstellungen zu speichern, Statistiken zu erstellen sowie dir passende Inhalte und Werbung von uns und unseren Werbepartnern (z. B. Veranstaltern) anzuzeigen. Einige Informationen zum Nutzerverhalten teilen wir mit unseren Werbepartnern. Zusammen mit der Eventim Media House GmbH verantworten wir die Anzeige personalisierter Werbung und Inhalte auf unseren digitalen Angeboten und denen Dritter über die dir oder deinem Haushalt zugeordneten Geräte. Zu Personalisierungszecken erstellen wir Zielgruppen, die mit deiner Zustimmung ein pseudonymes Profil bilden, in das deine Nutzung unserer Webseite und weiteren Diensten (Newsletter, App) einfließt. Wir arbeiten mit 30 Anbietern zusammen, um Sicherheit zu gewährleisten und personalisierte Werbung und Inhalte bereitzustellen.
          - text: Indem du „Einverstanden“ klickst, willigst du in die Verwendung von Cookies zu allen o. g. Zwecken sowie der damit einhergehenden Datenverarbeitung ein und gestattest, dass diese Verarbeitungen auch außerhalb der EU erfolgen, z. B. in den USA.
          - text: Durch Klicken auf „Erforderliches“ kannst du optionale Cookies ablehnen. Unter „Einstellungen“ gelangst du zu einem Menü für eine differenzierte Auswahl, die durch Klicken auf „Einstellungen speichern“ gespeichert wird, z. B. in Bezug auf die Kategorien Erforderliches, Komfort- und Statistik, Marketing, Externe Medieninhalte, Werbung und Inhalte unter Verwendung des IAB TCF. Außerdem kannst du spezifische Auswahlen in Bezug auf die Einstellung von Profilen zur Personalisierung von Werbung und Inhalten treffen. Die Auswahl personalisierter Inhalte, Werbung und Inhaltsmessungen, Zielgruppenforschung und Verbesserung unserer Dienste findet im Rahmen unserer Nutzung des IAB Transparency and Consent Framework (TCF) statt. Informationen zu den berechtigten Interessen, für die wir Daten im Rahmen des IAB TCF verarbeiten, findest du ebenfalls unter „Einstellungen“.
          - text: Weitere Informationen, auch zu deinem Recht, die Einwilligung jederzeit zu widerrufen, erhältst du in der
          - link "Datenschutzinformation" [ref=e8]:
            - /url: "#"
          - text: ", Informationen zum Webseitenbetreiber findest du im"
          - link "Impressum" [ref=e9]:
            - /url: "#"
          - text: .
      - form [ref=e10]:
        - button "Einverstanden" [ref=e12]:
          - generic [ref=e13]: Einverstanden
        - button "Einstellungen" [ref=e15]
        - button "Erforderliches" [ref=e17]:
          - generic [ref=e18]: Erforderliches
    - 'button "Sprache: de" [ref=e19] [cursor=pointer]':
      - img [ref=e20]
  - link "Skip to main content" [ref=e21]:
    - /url: "#mainContainer"
  - generic [ref=e22]:
    - banner [ref=e23]:
      - img "Eintrittskarten Konzertkarten Tickets" [ref=e28]
    - main [ref=e29]:
      - generic [ref=e30]:
        - heading "Anmelden oder ein Konto erstellen" [level=1] [ref=e32]
        - generic [ref=e34]:
          - heading "Gib deine E-Mail-Adresse ein" [level=2] [ref=e35]
          - generic [ref=e36]:
            - paragraph [ref=e37]:
              - generic [ref=e38]: E-Mail-Adresse
            - textbox "E-Mail-Adresse" [active] [ref=e40]
          - button "Weiter" [ref=e41] [cursor=pointer]
          - paragraph [ref=e42]
    - contentinfo [ref=e43]:
      - generic [ref=e47]:
        - navigation [ref=e49]:
          - list:
            - listitem [ref=e50]:
              - link "AGB" [ref=e51] [cursor=pointer]:
                - /url: https://www.eventim.de/de/help/terms?affiliate=EVE
            - listitem [ref=e52]:
              - link "Datenschutz" [ref=e53] [cursor=pointer]:
                - /url: https://www.eventim.de/de/help/data-protection?affiliate=EVE
            - listitem [ref=e54]:
              - link "Impressum" [ref=e55] [cursor=pointer]:
                - /url: https://www.eventim.de/de/help/imprint?affiliate=EVE
            - listitem [ref=e56]:
              - link "Widerruf" [ref=e57] [cursor=pointer]:
                - /url: https://www.eventim.de/de/help/cancellation/?affiliate=EVE
        - generic [ref=e59]:
          - generic [ref=e60]: Bestell-Hotline
          - link "01806-570070":
            - /url: tel:01806-570070
          - paragraph [ref=e61]:
            - text: (0,20 €/Anruf inkl. MwSt aus allen dt. Netzen)
            - text: Mo – Sa von 09:00 Uhr – 18:00 Uhr
      - img "Eintrittskarten Konzertkarten Tickets" [ref=e64]
  - button "Cookie-Einstellungen" [ref=e66]:
    - img "Cookie-Einstellungen" [ref=e67]
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { Selectors } from '../core/selectors';
  3  | 
  4  | export class LoginPage {
  5  |   constructor(private page: Page) {}
  6  | 
  7  |   async navigate(): Promise<void> {
  8  |     await this.page.goto('/login');
  9  |   }
  10 | 
  11 |   async login(email: string, password: string): Promise<void> {
> 12 |     await this.page.fill(Selectors.auth.emailInput, email);
     |                     ^ TimeoutError: page.fill: Timeout 10000ms exceeded.
  13 |     await this.page.fill(Selectors.auth.passwordInput, password);
  14 |     await this.page.click(Selectors.auth.submitLogin);
  15 |     await this.page.waitForLoadState('networkidle');
  16 |   }
  17 | 
  18 |   async register(email: string, password: string): Promise<void> {
  19 |     await this.page.click(Selectors.auth.registerLink);
  20 |     await this.page.fill(Selectors.auth.registerEmail, email);
  21 |     await this.page.fill(Selectors.auth.registerPassword, password);
  22 |     await this.page.fill(Selectors.auth.registerConfirm, password);
  23 |     await this.page.click(Selectors.auth.submitRegister);
  24 |     await this.page.waitForLoadState('networkidle');
  25 |   }
  26 | 
  27 |   async getErrorMessage(): Promise<string | null> {
  28 |     const errorLocator = this.page.locator(Selectors.auth.errorMessage);
  29 |     if (await errorLocator.isVisible()) {
  30 |       return errorLocator.textContent();
  31 |     }
  32 |     return null;
  33 |   }
  34 | 
  35 |   async isUserLoggedIn(): Promise<boolean> {
  36 |     return this.page.locator(Selectors.auth.userMenu).isVisible();
  37 |   }
  38 | 
  39 |   async logout(): Promise<void> {
  40 |     await this.page.click(Selectors.auth.userMenu);
  41 |     await this.page.click(Selectors.auth.logoutButton);
  42 |   }
  43 | }
  44 | 
```