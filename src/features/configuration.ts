import type { CompatibilityRule } from '../types'
export type TableStudy = {
  model: 'comedor' | 'centro'
  shape: 'ovalada' | 'rectangular'
  length: number
  width: number
  height: number
  thickness: number
  wood: string
  resin: string
  legs: string
  finish: string
  extra: string
}
export const models = {
  comedor: {
    name: 'Mesa de comedor',
    length: [140, 260],
    width: [75, 115],
    height: [70, 80],
    base: 68900,
  },
  centro: {
    name: 'Mesa de centro',
    length: [65, 140],
    width: [45, 85],
    height: [32, 48],
    base: 19900,
  },
} as const
export const defaults: TableStudy = {
  model: 'comedor',
  shape: 'ovalada',
  length: 180,
  width: 90,
  height: 75,
  thickness: 4,
  wood: 'pino',
  resin: 'sin-resina',
  legs: 'madera',
  finish: 'mate',
  extra: 'sin extras',
}
export const rules: CompatibilityRule[] = [
  {
    when: { wood: 'olivo' },
    exclude: { resin: ['transparente'] },
    reason: 'El olivo con resina transparente queda fuera de este estudio de materiales.',
  },
  {
    when: { model: 'centro' },
    exclude: { extra: ['pasacables'] },
    reason: 'El pasacables se estudia únicamente en la mesa de comedor.',
  },
]
export function validateStudy(study: TableStudy) {
  const model = models[study.model]
  const dimensions = [
    ['Largo', study.length, model.length],
    ['Ancho', study.width, model.width],
    ['Altura', study.height, model.height],
    ['Espesor', study.thickness, [3, 6]],
  ] as const
  const issues = dimensions.flatMap(([label, value, [min, max]]) =>
    Number.isInteger(value) && value >= min && value <= max
      ? []
      : [label + ' entre ' + min + ' y ' + max + ' cm.'],
  )
  return [
    ...issues,
    ...rules
      .filter(
        (rule) =>
          Object.entries(rule.when).every(
            ([key, value]) => study[key as keyof TableStudy] === value,
          ) &&
          Object.entries(rule.exclude).some(([key, values]) =>
            values.includes(String(study[key as keyof TableStudy])),
          ),
      )
      .map((rule) => rule.reason),
  ]
}
export function estimateStudy(study: TableStudy) {
  return (
    models[study.model].base +
    Math.round((study.length * study.width) / 100) * 55 +
    (study.wood === 'nogal'
      ? 18000
      : study.wood === 'olivo'
        ? 25000
        : study.wood === 'roble'
          ? 9500
          : 0) +
    (study.resin === 'sin-resina' ? 0 : 16000) +
    (study.legs === 'acero negro' ? 9000 : 0)
  )
}
