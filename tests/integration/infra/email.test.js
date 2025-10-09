import email from "infra/email";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "prospectaai <contato@prospectaai.com.br>",
      to: "contato@prospectaai.dev",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });

    await email.send({
      from: "prospectaai <contato@prospectaai.com.br>",
      to: "contato@prospectaai.dev",
      subject: "Último email enviado",
      text: "Corpo do último email",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@prospectaai.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@prospectaai.dev>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email\r\n");
  });
});
