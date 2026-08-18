import type { Chapter } from "@/lib/discover";

/**
 * English edition of the Découvrir chapters. Written, not machine-translated;
 * the facts match the French exactly.
 */
export const CHAPTERS_EN: Chapter[] = [
  {
    id: "le-lieu",
    label: "The place",
    title: "Where the road stops and the sea begins",
    paragraphs: [
      "Taolagnaro — Fort-Dauphin on the colonial maps — sits on a narrow headland at the far south-eastern tip of Madagascar. The town is held between three bays: Libanona with its reef, the Baie des Galions to the north, and Ambinanibe and its dunes to the south-west. Behind it, Pic Saint-Louis rises to 529 metres, and beyond that begins the spiny forest, a vegetation found nowhere else on earth.",
      "It is this compression that makes the region: an hour of track takes you from mangrove to dry forest, from white sand to sisal plateaus. Few Malagasy destinations offer that much variety within so short a radius.",
      "The wind is part of the place. It blows across the headland for much of the year — it is what keeps the nights cool in the hot season, what made Vinanibe's name among kitesurfers, and the first thing anyone here mentions when you ask about the weather.",
    ],
    figure: {
      plates: ["forest"],
      caption: "The littoral forest at Sainte-Luce, 50 km north of town.",
    },
  },
  {
    id: "histoire",
    label: "History",
    title: "Four centuries on the same headland",
    paragraphs: [
      "In 1643 the French East India Company established Fort Dauphin here, the first lasting French settlement on the island. Étienne de Flacourt was its governor from 1648 to 1655; while here he wrote a history of Madagascar that would remain the principal European source on the country for a long time. The trading post was abandoned in 1674.",
      "But the headland was inhabited long before that. This is the country of the Antanosy, “those of the island”, whose villages still line the bays and the inland valleys. So Taolagnaro's history reads on two levels: the short, well-documented one of passing Europeans, and the longer one of Antanosy lineages who never left.",
      "What remains of the fort are its walls, which today house the Musée de l'Anosy. It is the simplest place to start if you want to understand the town before heading out to the reserves.",
    ],
    figure: {
      plates: ["town", "sand"],
      caption: "Fort Flacourt and the old town.",
    },
  },
  {
    id: "nature",
    label: "Nature & reserves",
    title: "Three protected areas within a hundred kilometres",
    paragraphs: [
      "Nahampoana reserve, seven kilometres from the centre, is the most accessible: a former botanical garden where several lemur species live semi-wild. It is the half-day trip most short-stay visitors make.",
      "Berenty, in the Mandrare valley to the west, is a private reserve known for its ring-tailed lemurs and Verreaux's sifakas, in a gallery forest of tamarinds. Allow a full day: the road is long and you leave before dawn.",
      "Andohahela National Park is the most remarkable of the three, and the least visited. It protects both rainforest and spiny forest on either side of the Anosy range — an ecological transition found nowhere else on the island. It is also one of the few places where the triangle palm grows, endemic to this region.",
    ],
    facts: [
      { label: "Nahampoana", value: "7 km · half a day · semi-wild lemurs" },
      { label: "Berenty", value: "≈ 80 km · full day · gallery forest" },
      { label: "Andohahela", value: "National park · rainforest and spiny forest" },
      { label: "Sainte-Luce", value: "≈ 50 km · littoral forest and lagoon" },
    ],
    figure: {
      plates: ["forest", "reef"],
      caption: "Gallery forest and littoral forest, an hour apart.",
    },
  },
  {
    id: "plages",
    label: "Beaches & ocean",
    title: "Three bays, a reef and a great deal of wind",
    paragraphs: [
      "Libanona is the town beach: a crescent of white sand sheltered by a reef, a quarter of an hour on foot from the market. It is where people swim, where you learn to surf, and where everyone comes to watch the sun go down from the rocks.",
      "Further south, Ambinanibe is a long dune beach, wind-blown and little visited. To the north-east, the Lokaro peninsula and Évatraha bay are reached by pirogue: lagoons, coves and dunes, with no road to get there.",
      "From July to September humpback whales move up the channel off the headland. They can sometimes be seen from land, notably from Pic Saint-Louis on a clear day.",
    ],
    figure: {
      plates: ["ocean", "sand", "sunset"],
      caption: "Libanona, Ambinanibe, Lokaro.",
    },
  },
  {
    id: "culture",
    label: "Antanosy culture",
    title: "The land of the Antanosy",
    paragraphs: [
      "The Antanosy are the main group in the region. Their social life rests on lineage and on respect for ancestors, and village life is punctuated by family ceremonies, festivals and local prohibitions — fady — which vary from place to place and are worth asking about before setting off on a path or photographing a site.",
      "The most visible craft is mahampy weaving, a marsh sedge worked by the women of Sainte-Luce and the lagoon villages. Mats, baskets and hats sell at the markets and provide several villages with a steady income.",
      "Inland, sisal and zebu shape both the economy and the landscape: plantations lined up to the horizon, herds crossing the track, carts heading down to market.",
    ],
    figure: {
      plates: ["town", "sunset"],
      caption: "The Taolagnaro market and mahampy weaving.",
    },
  },
  {
    id: "communautes",
    label: "Communities",
    title: "Tourism that stays in the region",
    paragraphs: [
      "Several of the stays offered here are run directly by villages — homestays at Sainte-Luce, locally trained guides, weaving workshops. It is the model that leaves the most value in place, and the one this platform highlights wherever it exists.",
      "In practice that means choosing a guide from the region rather than an escort brought in from elsewhere, eating where the cooking is done with market produce, and asking before photographing. Nothing heroic: in an economy this size it is the ordinary gestures that make the difference.",
      "Listings marked “Community-run” are the ones whose income goes to an association or a village.",
    ],
  },
  {
    id: "pratique",
    label: "Practical",
    title: "What to know before you come",
    paragraphs: [
      "Flying remains the simplest way in: Taolagnaro is connected to Antananarivo by regular flights, with a possible stop depending on the day. By road, the RN13 from Ihosy is long and the state of the track varies a great deal with the season — ask locally rather than trusting a map.",
      "The best window runs from April to November. The rainy and cyclone season falls roughly between December and March; some establishments close or reduce their service then. The whales are only here from July to September.",
      "The currency is the ariary, and most things are settled in cash: draw money before leaving town, as ATMs are scarce once you do. French is widely spoken in tourism, Malagasy everywhere, English less often.",
    ],
    facts: [
      { label: "Dry season", value: "April to November" },
      { label: "Cyclones", value: "December to March, variable" },
      { label: "Whales", value: "July to September" },
      { label: "Currency", value: "Ariary (Ar) · cash essential" },
      { label: "Languages", value: "Malagasy, French; English less common" },
    ],
  },
];
