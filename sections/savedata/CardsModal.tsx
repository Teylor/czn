"use client"

import { useState } from "react";
import Image from "next/image";
import { COMMON_CARDS, MONSTER_CARDS, FORBIDDEN_CARDS } from "@/lib/Builds";

type Props = {
	open: boolean;
	onClose: () => void;
	onAddCard: (card: any) => void;
};

export default function CardsModal({ open, onClose, onAddCard }: Props) {
	const [tab, setTab] = useState<"common" | "monster" | "forbidden">("common");

	if (!open) return null;

	const list = tab === "common" ? COMMON_CARDS : tab === "monster" ? MONSTER_CARDS : FORBIDDEN_CARDS;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />
			<div className="relative z-10 bg-white p-6 rounded-md max-w-3xl w-full mx-4 sm:mx-6">
				<h3 className="text-xl font-bold mb-3">Select Card to Add</h3>
				<div className="flex gap-2 mb-4">
					<button className={`px-3 py-1 rounded ${tab === "common" ? "bg-zinc-200" : "bg-white"}`} onClick={() => setTab("common")}>Common</button>
					<button className={`px-3 py-1 rounded ${tab === "monster" ? "bg-zinc-200" : "bg-white"}`} onClick={() => setTab("monster")}>Monster</button>
					<button className={`px-3 py-1 rounded ${tab === "forbidden" ? "bg-zinc-200" : "bg-white"}`} onClick={() => setTab("forbidden")}>Forbidden</button>
				</div>

				<div className="space-y-2 max-h-96 overflow-auto">
					{list.length === 0 && <div className="text-sm text-gray-500">No cards available</div>}
					{list.map((card: any) => (
						<div key={card.id} className="flex items-center justify-between p-2 border rounded">
							<div className="flex items-center gap-3">
								{card.img && (
									<Image src={card.img} alt={card.name} width={48} height={48} />
								)}
								<div>
									<div className="font-bold">{card.name}</div>
									<div className="text-sm text-gray-600">{card.effect}</div>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="text-sm">Cost: {card.cost}</div>
								<button
									className="ml-2 btn-primary"
									onClick={() => { onAddCard(card); }}
								>
									Add
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="mt-3 text-right">
					<button className="btn-primary" onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	);
}
