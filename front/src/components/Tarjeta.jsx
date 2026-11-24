// Componente reutilizable: lo que varia entra por props.
export default function Tarjeta({ titulo, valor, detalle }) {
  return (
    <div className="tarjeta">
      <span className="tarjeta-titulo">{titulo}</span>
      <strong className="tarjeta-valor">{valor}</strong>
      {detalle && <span className="tarjeta-detalle">{detalle}</span>}
    </div>
  );
}
