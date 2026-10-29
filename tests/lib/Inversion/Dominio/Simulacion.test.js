const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const Cliente = require("../../../../src/lib/Inversion/Dominio/Entidades/Cliente");
const Simulacion = require("../../../../src/lib/Inversion/Dominio/Entidades/Simulacion");

const cliente = new Cliente({
  nombres: "Ana Pérez",
  cedula: "1710034065",
  email: "ana@correo.com",
  celular: "0991234567"
});

describe("Simulacion", () => {
  it("calcula el valor futuro con interés compuesto", () => {
    const s = new Simulacion({ cliente, capital: 1000, tasaPorcentaje: 5, periodosAnuales: 12, anios: 1 });
    assert.equal(Math.round(s.valorFuturo() * 100) / 100, 1051.16);
  });

  it("el interés ganado es el monto final menos el capital", () => {
    const s = new Simulacion({ cliente, capital: 1000, tasaPorcentaje: 5, periodosAnuales: 12, anios: 1 });
    assert.ok(Math.abs(s.interesGanado() - (s.valorFuturo() - 1000)) < 1e-9);
  });

  it("rechaza un capital de exactamente 100", () => {
    assert.throws(() => new Simulacion({ cliente, capital: 100, tasaPorcentaje: 5, periodosAnuales: 12, anios: 1 }));
  });

  it("asigna categorías en los límites del enunciado", () => {
    const crear = (capital) => new Simulacion({ cliente, capital, tasaPorcentaje: 5, periodosAnuales: 12, anios: 1 });
    assert.equal(crear(100.01).categoria, 3);
    assert.equal(crear(500).categoria, 3);
    assert.equal(crear(500.01).categoria, 2);
    assert.equal(crear(1000).categoria, 2);
    assert.equal(crear(1000.01).categoria, 1);
  });

  it("no categoriza si n no es 12", () => {
    const s = new Simulacion({ cliente, capital: 800, tasaPorcentaje: 5, periodosAnuales: 4, anios: 1 });
    assert.equal(s.categoria, null);
  });
});

describe("Cliente", () => {
  it("rechaza una cédula que no tiene 10 dígitos", () => {
    assert.throws(() => new Cliente({
      nombres: "Ana Pérez", cedula: "17100340", email: "ana@correo.com", celular: "0991234567"
    }));
  });
});