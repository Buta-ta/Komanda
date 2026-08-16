"use client";

export function DeleteButton({ id }: { locale: string; id: string }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("La suppression sera disponible dans le prochain écran d'admin.");
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50"
      >
        Supprimer
      </button>
    </form>
  );
}