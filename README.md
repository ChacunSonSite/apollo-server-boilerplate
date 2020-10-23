# APOLLO SERVER BOILERPLATE

This proyect is a good starting point for a project. it includes multiple packages for facilitate the development and upgrade the performance.

## Set up
This project uses mongodb as a persistent mechanism, to set it up please use the .env.model as a starting point, copying it to a .env file and providing the desired configuration, specially around the db connection information, then follow either the development or production cycle as specified below. 

## Development

    yarn
    yarn build:dev

`yarn build:dev` will start webpack devserver for hot module reload

    yarn dev

it will start your proyect

## Production

    yarn
    yarn build
    yarn start

the proyect will start running.

## Build Analize

You can easy analize your bundle and see the weight of each package, just use `yarn build --env a`

### TODO:

- Incorporate a CI for build out and be capable to use `yarn install --prod` for reduce the node_modules footprint on production.
