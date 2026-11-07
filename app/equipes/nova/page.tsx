import { createEquipe } from "@/lib/actions/equipes";

const MODALIDADES = [
  { value: "FUTEBOL_CAMPO", label: "Futebol de Campo" },
  { value: "FUTSAL", label: "Futsal" },
  { value: "BEACH_SOCCER", label: "Beach Soccer" },
  { value: "VOLEI", label: "Vôlei" },
  { value: "SOCIETY", label: "Futebol Society" },
  { value: "BASQUETE", label: "Basquete" },
];

export default function NovaEquipePage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-xl font-bold text-navy-900">Nova Equipe</h1>

      <form
        action={createEquipe}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="nome"
            className="mb-1 block text-sm font-medium text-navy-900"
          >
            Nome da equipe
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            placeholder="Ex: AB F.C."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <div>
          <label
            htmlFor="modalidade"
            className="mb-1 block text-sm font-medium text-navy-900"
          >
            Modalidade
          </label>
          <select
            id="modalidade"
            name="modalidade"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <option value="" disabled>
              Selecione...
            </option>
            {MODALIDADES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="escudoUrl"
            className="mb-1 block text-sm font-medium text-navy-900"
          >
            URL do escudo (opcional por enquanto)
          </label>
          <input
            id="escudoUrl"
            name="escudoUrl"
            type="url"
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          Salvar Equipe
        </button>
      </form>
    </div>
  );
}