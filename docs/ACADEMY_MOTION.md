# Academy: lessons and simulations

The Academy (`/academy`) is for **business owners**. It has one lesson per OWASP Top 10 risk. Each lesson is a
single YAML file in `content/owasp/`, validated by `owaspTopicSchema` in `lib/content/schemas.ts`. The admin panel
writes these files and should follow this document.

## Files

| File | What it holds |
|---|---|
| `content/owasp/_businesses.yml` | The business types in the "I run a…" picker and their shared words (`person`, `record`, `doc`…) |
| `content/owasp/NN-<slug>.yml` | One lesson. `NN` is the OWASP rank. The URL is `/academy/owasp/<slug>` |
| `components/owasp/sims/kit.tsx` | Colour themes and the building blocks for simulation scenes |

## Placeholders

Lesson text is written once and filled in for the visitor's business: `{person}` → customer / patient / student.
`{Person}` capitalises the word, and `{records|slug}` swaps spaces for dashes. Words come from `_businesses.yml`,
then from the lesson's `vars.<business>` block, which wins. Formatting is limited to `**bold**` and
`[[highlight]]`. `npm test` fails if a placeholder is left unfilled for any business.

## Colour

`theme` picks the lesson's colour: violet, orange, sky, teal, amber, rose, indigo, fuchsia, lime or red. The
gallery tile, the simulation and its accents all use it. Each lesson should have a different colour from its
neighbours.

## Gallery tile

The tile shows only moving visuals, never text. The lesson title (bold), its code and the reading time sit
underneath. Set `preview.video` to a short silent loop to replace the placeholder motion.

## Simulation

```yaml
simulation:
  title: "Try it: open a {record} that isn't yours."
  lede: Follow the directions next to the screen…
  steps:                       # in order; the last two are normally "fix" and "retry"
    - id: open
      title: Open your own {record}           # shown in the directions list
      direction: Click your {record}, number {a}.   # what to do
      explain: Your {record} opens. …         # what just happened, shown once the step is done
  definition: "**Broken access control** means …"  # shown at the end
```

Write in a calm, professional tone: say what happens and why it matters, with no slang, analogies or jokes.

The visual scene for each topic (a login page, a checkout, server settings…) is planned for
`components/owasp/sims/<slug>.tsx`. It will use the kit's `<T id="…">` wrapper so the highlighted element
completes the matching step. Until a lesson has its scene, the simulation shows the guided steps in the lesson's
colour.

## Page order

1. Title, question, business picker
2. Simulation (`simulation`)
3. In 10 seconds (`quick`), Meet the family (`variants`, optional)
4. Where it hides (`map.zones`). `simulate: true` adds "Try it in the simulation"
5. What it costs (`cost`)
6. Does this apply to you? (`checklist`), one card at a time. `simulate: true` offers a replay
7. Real cases, Your part, the developer layer, Remember
8. Watch it instead (`video`): `youtube` id or `src`; empty shows "Coming soon"
