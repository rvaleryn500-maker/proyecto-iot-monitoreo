function calcularAutonomia(combustible, consumo = 5) {
    return combustible / consumo;
  }
  
  function generarAlerta(combustible) {
    const autonomia = calcularAutonomia(combustible);
    return autonomia < 1 ? "⚠️ Combustible bajo" : null;
  }
  
  module.exports = { calcularAutonomia, generarAlerta };