# x[BiT]

This is a very simple api wrapper around [x[BiT]](https://github.com/scriptzteam/xBiT-Torrents-Magnets-Indexer)'s magnet indexer in Node using Promises.

## Installation

```bash
$ npm i xbit --save
```

## Usage

### Initialize

```javascript
const Xbit = require('xbit')

// Create a new instance of the module.
const xbit = new Xbit()
```

### Methods

There are two methods, `search()` and `latest()` that you can use. The `search()` method has two parameters searching.

```javascript
// Search
xbit.search({
  search: 'ubuntu',
  limit: 10
}).then(response => {
    console.log(response)
    // Output:
    // [
    // {
    //   "ID": "1183900",
    //   "NAME": "ubuntu-game-pack-16.04",
    //   "MAGNET": "magnet:?xt=urn:btih:0831867c3a0a03bc33fa6add369d7a73c04c85f3&dn=ubuntu-game-pack-16.04",
    //   "SIZE": "4.09GB",
    //   "DISCOVERED": "2017-11-12 22:17:21"
    // },
    // {
    //   "ID": "1175146",
    //   "NAME": "ubuntu-pack-14.04-cinnamon",
    //   "MAGNET": "magnet:?xt=urn:btih:b2bb17d605709b1d34c03a3503b93ffc0e912568&dn=ubuntu-pack-14.04-cinnamon",
    //   "SIZE": "2.31GB",
    //   "DISCOVERED": "2017-11-12 21:00:28"
    // },
    // ]
  })
  .catch(err => console.error(err))

// List recent magnets
xbit.list()
  .then(response => {
    console.log(response)
    // Output:
    // [
    // {
    //   "ID": "1206042",
    //   "NAME": "Azbuka",
    //   "MAGNET": "magnet:?xt=urn:....",
    //   "SIZE": "11.24MB",
    //   "DISCOVERED": "2017-11-13 03:02:47"
    // },
    // {
    //   "ID": "1206041",
    //   "NAME": "素人四畳半生中出し",
    //   "MAGNET": "magnet:?xt=urn:....",
    //   "SIZE": "15.37GB",
    //   "DISCOVERED": "2017-11-13 03:02:44"
    // },
    // {
    //   "ID": "1206040",
    //   "NAME": "Jeremy Camp - I Will Follow",
    //   "MAGNET": "magnet:?xt=urn:....",
    //   "SIZE": "285.95MB",
    //   "DISCOVERED": "2017-11-13 03:02:44"
    // },
    // {
    //   "ID": "1206039",
    //   "NAME": "Gotham.S03E18.720p.HDTV.x264-KILLERS[ettv]",
    //   "MAGNET": "magnet:?xt=urn:....",
    //   "SIZE": "966.79MB",
    //   "DISCOVERED": "2017-11-13 03:02:41"
    // },
    //   ...
    // ]
  })
  .catch(err => console.error(err))
```

## License

MIT
