// Generated from src/data/treatments.js. Do not edit manually.
export const publicTreatments = [
  {
    "slug": "reafirma-tu-belleza",
    "name": "Reafirma tu Belleza",
    "zones": [
      "Brazos",
      "Firmeza y textura"
    ],
    "type": "body"
  },
  {
    "slug": "cintura-de-ensueno",
    "name": "Cintura de Ensueño",
    "zones": [
      "Abdomen"
    ],
    "type": "body"
  },
  {
    "slug": "curvas-definidas",
    "name": "Curvas Definidas",
    "zones": [
      "Piernas"
    ],
    "type": "body"
  },
  {
    "slug": "esculpe-y-reafirma",
    "name": "Esculpe y Reafirma",
    "zones": [
      "Silueta completa",
      "Firmeza y textura"
    ],
    "type": "body"
  },
  {
    "slug": "brazos-de-seda",
    "name": "Brazos de Seda",
    "zones": [
      "Brazos",
      "Firmeza y textura"
    ],
    "type": "body"
  },
  {
    "slug": "piernas-sin-imperfecciones",
    "name": "Piernas Sin Imperfecciones",
    "zones": [
      "Piernas",
      "Firmeza y textura"
    ],
    "type": "body"
  },
  {
    "slug": "figura-en-equilibrio",
    "name": "Figura en Equilibrio",
    "zones": [
      "Abdomen"
    ],
    "type": "body"
  },
  {
    "slug": "renueva-tu-silueta",
    "name": "Renueva tu Silueta",
    "zones": [
      "Abdomen",
      "Silueta completa"
    ],
    "type": "body"
  },
  {
    "slug": "cuerpo-esculpido",
    "name": "Cuerpo Esculpido",
    "zones": [
      "Abdomen"
    ],
    "type": "body"
  },
  {
    "slug": "silueta-luminosa",
    "name": "Silueta Luminosa",
    "zones": [
      "Abdomen",
      "Silueta completa"
    ],
    "type": "body"
  },
  {
    "slug": "juventud-radiante",
    "name": "Juventud Radiante",
    "zones": [
      "Rostro"
    ],
    "type": "facial"
  }
];

export function getPublicTreatmentsByZone(zone) {
  if (!zone) return publicTreatments;
  return publicTreatments.filter((treatment) => treatment.zones.includes(zone));
}
