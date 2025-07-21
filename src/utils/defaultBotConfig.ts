import HDE from '@/plugin'

export default function () {
  try {
    const entries = HDE.vars.Default_bot_config_for_group.split(',')
      .map((e: string) =>
        e
          .trim()
          .split(':')
          .map((q) => q.trim())
      )
      .filter(Boolean)
    return new Map(entries)
  } catch (error) {
    console.warn('Конфиг для выбора бота по группе неправильно написан')

    return new Map()
  }
}
