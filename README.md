# express-zod-api-zodv4-type-issue

## Getting started

```bash
nvm use # might need to nvm install, using node 22 LTS

pnpm i

pnpm run build && pnpm run start

# inspect example.documentation.yaml, notice the examples

pnpm install express-zod-api@25.0.0

pnpm run build && pnpm run start # this will now error

#}).example({ name: 'bingo' });
#   ^
#
#TypeError: zod_1.z.object(...).example is not a function

# Comment out '.example(...) in index.ts like so:
#// method 1 for providing example
#const input = z.object({
#  name: z.string().optional(),
#})//.example({name: 'bingo'})

pnpm run build && pnpm run start
# ^^ this will now output a swagger. However, there are now NO examples in the documentation output


```