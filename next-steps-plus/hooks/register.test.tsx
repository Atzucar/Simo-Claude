import { expect, mock, test } from 'claude-code/testing'

const USAGE = {
  input_tokens: 100,
  output_tokens: 50,
  cache_read_input_tokens: 900,
  cache_creation_input_tokens: 0,
  model: 'm',
}

test('after a turn the band shows cache line, next steps and Handoff', async ($, on) => {
  mock.clock(on, { now: 1000 })
  mock.store(on)
  on('turn.complete', async () => ({ text: 'hecho' }))
  on('command.list', async () => ({ value: [] }) as never)
  on('prompt.suggest', async () => ({ isShown: false }) as never)
  on('session.usage', async () => ({
    value: {
      startedAt: 0,
      context: { tokens: 577000, window: 1000000, percent: 58 },
      rateLimits: [
        { kind: 'five_hour', percentUsed: 4, resetsAt: new Date(1000 + (2 * 60 + 31) * 60000).toISOString() },
        { kind: 'seven_day', percentUsed: 16, resetsAt: new Date(1000 + (3 * 24 + 16) * 3600000).toISOString() },
      ],
      cost: { usd: 23.25 },
    },
  }) as never)
  on('ui.render', { component: 'AbovePrompt' }, async ($, e) => {
    const { Box } = $.ui.resolve(e)
    return <Box />
  })
  on('model.fork', async () => ({
    value: {
      isAnswered: true,
      text: '[{"label":"Revisa el resultado","prompt":"Revisa el resultado"}]',
      usage: USAGE,
    },
  }) as never)

  await $.turn.complete({
    answer: 'x'.repeat(200),
    durationMs: 10,
    isAborted: false,
    turnId: 't1',
    reason: 'answer',
    usage: USAGE,
  } as never)
  for (let i = 0; i < 80; i += 1) await Promise.resolve()

  const band = await $.ui.mount({
    plugin: 'next-steps-plus',
    surface: 'terminal',
    component: 'AbovePrompt',
    props: { hasSurvey: false, isWorking: false, maxRows: 10 } as never,
  })

  expect((await band.find({ key: 's0' }))?.text).toContain('Revisa el resultado')
  expect(await band.find({ text: 'Handoff' })).toBeDefined()
  const texts = JSON.stringify(await band.findAll({ type: 'Text' }))
  for (const part of ['caché 60m', 'contexto 577k 58%', '5h 4% ⟳2h31', 'semana 16% ⟳3d16h', 'coste API $23.25']) {
    expect(texts).toContain(part)
  }
  expect(await band.find({ text: 'Detalles' })).toBeDefined()
})
