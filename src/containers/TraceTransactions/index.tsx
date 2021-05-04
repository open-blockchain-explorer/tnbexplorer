import React, {useState, useRef} from 'react';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import {DagreGraph} from '@ant-design/charts';

import {ChartsCard, PageContentsLayout} from 'components';

const TraceTransactions = () => {
  const userAccount = '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1';
  const sourceData = {
    nodes: [
      {
        id: 'addf211d203c077bc5c6b78f41ddc68481804539de4bd3fd736fa853514551c0',
        label: 'addf211d2...',
        type: 'rect',
      },
      {id: '9ced844affabab9765694e242877f1a79715c2fc9c7911de00fa04dc7bf8b91a', label: '9ced844af...', type: 'rect'},
      {id: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822', label: '2c83d639e...', type: 'rect'},
      {id: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d', label: 'c536b7717...', type: 'rect'},
      {id: 'b8fc2c7874c410b9747d214b6772b469df088fbf561bc2f4fe8a6dada3e6f137', label: 'b8fc2c787...', type: 'rect'},
      {id: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72', label: 'b1b1e9010...', type: 'rect'},
      {id: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf', label: '67077b239...', type: 'rect'},
      {id: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535', label: 'f0fe0fdff...', type: 'rect'},
      {id: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c', label: '0f92e9751...', type: 'rect'},
      {id: '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5', label: '23676c35f...', type: 'rect'},
      {id: 'cad6b0caef47073a482c9fb470f8655df4ded9f5486bf2cb3f626722e8c0ea77', label: 'cad6b0cae...', type: 'rect'},
      {id: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd', label: 'f1d85cecf...', type: 'rect'},
      {id: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25', label: '29f492ff2...', type: 'rect'},
      {id: '4a14d0df86e261d297d4c3e5f861d303d5cc5f74e28d29f157c876e08aff4684', label: '4a14d0df8...', type: 'rect'},
      {id: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1', label: '892852680...', type: 'rect'},
      {id: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337', label: 'fe06754d2...', type: 'rect'},
      {id: '532547fc0197a9d2cd56a85bc24357c27abc88f5d9da717d44314cc080c8e3b5', label: '532547fc0...', type: 'rect'},
      {id: 'fca24024d7d837275f264ed91a6169e4fadede4b786b53edabcf13f2c30763d2', label: 'fca24024d...', type: 'rect'},
      {id: '84335f181962c8b000c115335565842baa65d79d466a58f9793a7811af5c0162', label: '84335f181...', type: 'rect'},
      {id: '9cb647da9ea1445c361e6d734a6ee0fce4896230392947713686697dd586495b', label: '9cb647da9...', type: 'rect'},
      {id: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a', label: '22d0f0047...', type: 'rect'},
      {id: 'a603f51b8995cd41944fda06adc6f7a5f10cf08d5acfbae7ebf734c30ca8e64f', label: 'a603f51b8...', type: 'rect'},
      {id: '8270a6c0e62d66592bbe94c6abeb1afe66c46c1dbed45ea6a8b546993232da8e', label: '8270a6c0e...', type: 'rect'},
      {id: '75ea55532b1fdb0ad7e223cd092537112df0ba028d773f7619fa86286483c0b6', label: '75ea55532...', type: 'rect'},
      {id: '48e44f4516134e68d6809ed9363e2db35d9a03cf19085de3cd5c3372bbdd631a', label: '48e44f451...', type: 'rect'},
      {id: '400f7cc0382255bc9077f77b95b9303eb93c9b3d8078f1964d09e38ba0d8365e', label: '400f7cc03...', type: 'rect'},
      {id: '92ae2001d0b78581f70cbd9d943e53974f658b859a35be74739c1f264ddbe67e', label: '92ae2001d...', type: 'rect'},
      {id: '86cbaa1e021cc7d21ceedefc493051004c5ffffbc09a4ecd25e3a8dc49975d3e', label: '86cbaa1e0...', type: 'rect'},
      {id: 'f6f38190713621648c7a1d8e52cb300e9da5cad47aa190004dcc22a17c1963d2', label: 'f6f381907...', type: 'rect'},
    ],
    /* eslint-disable sort-keys */
    edges: [
      {
        source: 'addf211d203c077bc5c6b78f41ddc68481804539de4bd3fd736fa853514551c0',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '250',
      },
      {
        source: '9ced844affabab9765694e242877f1a79715c2fc9c7911de00fa04dc7bf8b91a',
        target: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        label: '100000',
      },
      {
        source: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        target: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c',
        label: '25000',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: 'a603f51b8995cd41944fda06adc6f7a5f10cf08d5acfbae7ebf734c30ca8e64f',
        label: '19600',
      },
      {
        source: 'b8fc2c7874c410b9747d214b6772b469df088fbf561bc2f4fe8a6dada3e6f137',
        target: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf',
        label: '47',
      },
      {
        source: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        target: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        label: '70',
      },
      {
        source: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '3',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        label: '6810000',
      },
      {
        source: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '250',
      },
      {
        source: '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '19000',
      },
      {
        source: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        target: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        label: '50000',
      },
      {
        source: 'addf211d203c077bc5c6b78f41ddc68481804539de4bd3fd736fa853514551c0',
        target: '86cbaa1e021cc7d21ceedefc493051004c5ffffbc09a4ecd25e3a8dc49975d3e',
        label: '750',
      },
      {
        source: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf',
        target: '84335f181962c8b000c115335565842baa65d79d466a58f9793a7811af5c0162',
        label: '1',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: 'addf211d203c077bc5c6b78f41ddc68481804539de4bd3fd736fa853514551c0',
        label: '200000',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        label: '19600',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        label: '19600',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        label: '3000',
      },
      {
        source: 'cad6b0caef47073a482c9fb470f8655df4ded9f5486bf2cb3f626722e8c0ea77',
        target: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        label: '19998',
      },
      {
        source: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        target: '4a14d0df86e261d297d4c3e5f861d303d5cc5f74e28d29f157c876e08aff4684',
        label: '5',
      },
      {
        source: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '3250',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf',
        label: '24600',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '75ea55532b1fdb0ad7e223cd092537112df0ba028d773f7619fa86286483c0b6',
        label: '400000',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        label: '19600',
      },
      {
        source: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        target: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        label: '20073',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: '86cbaa1e021cc7d21ceedefc493051004c5ffffbc09a4ecd25e3a8dc49975d3e',
        label: '19600',
      },
      {
        source: 'b8fc2c7874c410b9747d214b6772b469df088fbf561bc2f4fe8a6dada3e6f137',
        target: '84335f181962c8b000c115335565842baa65d79d466a58f9793a7811af5c0162',
        label: '3',
      },
      {
        source: '4a14d0df86e261d297d4c3e5f861d303d5cc5f74e28d29f157c876e08aff4684',
        target: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        label: '3',
      },
      {
        source: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        target: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        label: '51000',
      },
      {
        source: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        target: '92ae2001d0b78581f70cbd9d943e53974f658b859a35be74739c1f264ddbe67e',
        label: '265232',
      },
      {
        source: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        target: 'a603f51b8995cd41944fda06adc6f7a5f10cf08d5acfbae7ebf734c30ca8e64f',
        label: '3',
      },
      {
        source: '532547fc0197a9d2cd56a85bc24357c27abc88f5d9da717d44314cc080c8e3b5',
        target: 'a603f51b8995cd41944fda06adc6f7a5f10cf08d5acfbae7ebf734c30ca8e64f',
        label: '7500',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf',
        label: '19600',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c',
        label: '19600',
      },
      {
        source: 'fca24024d7d837275f264ed91a6169e4fadede4b786b53edabcf13f2c30763d2',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '2750',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '176400',
      },
      {
        source: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        target: '48e44f4516134e68d6809ed9363e2db35d9a03cf19085de3cd5c3372bbdd631a',
        label: '10000',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '86cbaa1e021cc7d21ceedefc493051004c5ffffbc09a4ecd25e3a8dc49975d3e',
        label: '19600',
      },
      {
        source: '84335f181962c8b000c115335565842baa65d79d466a58f9793a7811af5c0162',
        target: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf',
        label: '1',
      },
      {
        source: '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5',
        target: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        label: '252000',
      },
      {
        source: '9cb647da9ea1445c361e6d734a6ee0fce4896230392947713686697dd586495b',
        target: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c',
        label: '2000',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '16000',
      },
      {
        source: 'addf211d203c077bc5c6b78f41ddc68481804539de4bd3fd736fa853514551c0',
        target: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25',
        label: '203522',
      },
      {
        source: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        target: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        label: '1200',
      },
      {
        source: '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5',
        target: 'f6f38190713621648c7a1d8e52cb300e9da5cad47aa190004dcc22a17c1963d2',
        label: '8000',
      },
      {
        source: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25',
        target: '86cbaa1e021cc7d21ceedefc493051004c5ffffbc09a4ecd25e3a8dc49975d3e',
        label: '500',
      },
      {
        source: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        target: '86cbaa1e021cc7d21ceedefc493051004c5ffffbc09a4ecd25e3a8dc49975d3e',
        label: '2000',
      },
      {
        source: 'a603f51b8995cd41944fda06adc6f7a5f10cf08d5acfbae7ebf734c30ca8e64f',
        target: '532547fc0197a9d2cd56a85bc24357c27abc88f5d9da717d44314cc080c8e3b5',
        label: '39199',
      },
      {
        source: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        target: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        label: '1',
      },
      {
        source: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25',
        target: 'f6f38190713621648c7a1d8e52cb300e9da5cad47aa190004dcc22a17c1963d2',
        label: '250',
      },
      {
        source: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        target: '22d0f0047b572a6acb6615f7aae646b0b96ddc58bfd54ed2775f885baeba3d6a',
        label: '3000',
      },
      {
        source: '8270a6c0e62d66592bbe94c6abeb1afe66c46c1dbed45ea6a8b546993232da8e',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '1',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        label: '19600',
      },
      {
        source: '75ea55532b1fdb0ad7e223cd092537112df0ba028d773f7619fa86286483c0b6',
        target: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        label: '399998',
      },
      {
        source: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        target: '8270a6c0e62d66592bbe94c6abeb1afe66c46c1dbed45ea6a8b546993232da8e',
        label: '3',
      },
      {
        source: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c',
        target: '2c83d639e20b8937edee50fd2b5286c1651012fc5cd4825e7f156d5a88b4e822',
        label: '25000',
      },
      {
        source: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25',
        target: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c',
        label: '250',
      },
      {
        source: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '3250',
      },
      {
        source: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        target: 'f6f38190713621648c7a1d8e52cb300e9da5cad47aa190004dcc22a17c1963d2',
        label: '20426',
      },
      {
        source: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        target: '9ced844affabab9765694e242877f1a79715c2fc9c7911de00fa04dc7bf8b91a',
        label: '100002',
      },
      {
        source: '23676c35fce177aef2412e3ab12d22bf521ed423c6f55b8922c336500a1a27c5',
        target: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        label: '15902786',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: 'f1d85cecf85d7da38401dc58fabf1aa4294c881bb9d2c47642d1b460017f06cd',
        label: '19600',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '0f92e975101eb96cea80dce430d74efd3172fa229377818d467ded85dcf2ab6c',
        label: '19600',
      },
      {
        source: '48e44f4516134e68d6809ed9363e2db35d9a03cf19085de3cd5c3372bbdd631a',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '9998',
      },
      {
        source: '400f7cc0382255bc9077f77b95b9303eb93c9b3d8078f1964d09e38ba0d8365e',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '109',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '9cb647da9ea1445c361e6d734a6ee0fce4896230392947713686697dd586495b',
        label: '50000',
      },
      {
        source: '29f492ff241c43afd78027822151ea52a5409cbd684d75bde8973f5a465a0d25',
        target: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        label: '250',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '20600',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        label: '19600',
      },
      {
        source: 'a603f51b8995cd41944fda06adc6f7a5f10cf08d5acfbae7ebf734c30ca8e64f',
        target: 'fe06754d2dbf23509e975809e9023b620509c1e6618472f16c9659f59e940337',
        label: '29608',
      },
      {
        source: '67077b2397f99fb6c63185af25cdf49d43736b22b7ea5dd68089a04cd4dbf8cf',
        target: 'b8fc2c7874c410b9747d214b6772b469df088fbf561bc2f4fe8a6dada3e6f137',
        label: '6',
      },
      {
        source: '92ae2001d0b78581f70cbd9d943e53974f658b859a35be74739c1f264ddbe67e',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '3',
      },
      {
        source: 'c536b7717f4c3e3b864e384c2156a44f952223326bc0eab4f2f8be1a34bc2e6d',
        target: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        label: '19600',
      },
      {
        source: '86cbaa1e021cc7d21ceedefc493051004c5ffffbc09a4ecd25e3a8dc49975d3e',
        target: 'b1b1e90107d804e5317c8527129ceaededdcb162a6737112b88712742a08bb72',
        label: '22500',
      },
      {
        source: 'f6f38190713621648c7a1d8e52cb300e9da5cad47aa190004dcc22a17c1963d2',
        target: 'cad6b0caef47073a482c9fb470f8655df4ded9f5486bf2cb3f626722e8c0ea77',
        label: '20420',
      },
      {
        source: 'f0fe0fdff41db888a0938882502ee809f6874c015aa09e11e38c8452d4175535',
        target: '8928526805de48e4bf2ed2a9b4b839e6b2603018ecdfbf4cffdb2065e01a3ed1',
        label: '5000',
      },
    ],
  };

  const [data, setData] = useState(sourceData);

  const [nodeStyle, setNodeStyle] = useState({
    fontFamily: 'Titillium Web',
  });
  const [edgeStyle, setEdgeStyle] = useState();
  const [layoutCfg, setLayoutCfg] = useState();
  const [anchorPoints, setAnchorPoints] = useState();
  const [nodeType, setNodeType] = useState();
  const [minimapCfg, setMinimapCfg] = useState({
    show: true,
  });
  const [behaviors, setBehaviors] = useState(['drag-canvas', 'zoom-canvas', 'drag-node']);
  const [nodeLabelCfg, setNodeLabelCfg] = useState();

  const ref = useRef();

  const destroyGraph = () => {
    // ref.current.destroy();
  };

  const updateBehaviors = () => {
    if (behaviors.indexOf('drag-node') !== -1) {
      setBehaviors(['drag-canvas', 'zoom-canvas']);
    } else {
      setBehaviors(['drag-canvas', 'zoom-canvas', 'drag-node']);
    }
  };

  const handleEdgeClick = (item: any, graph: any) => {
    graph.setItemState(item, 'selected', true);
  };
  const handleNodeClick = (item: any, graph: any) => {
    graph.setItemState(item, 'user', true);
  };

  const handleCanvasClick = (graph: any) => {
    const selectedEdges = graph.findAllByState('edge', 'selected');
    selectedEdges.forEach((edge: any) => {
      graph.setItemState(edge, 'selected', false);
    });

    const selectedNodes = graph.findAllByState('node', 'selected');
    selectedNodes.forEach((node: any) => {
      graph.setItemState(node, 'selected', false);
    });
  };

  const edgeStateStyles = {
    hover: {
      stroke: '#1890ff',
      lineWidth: 2,
    },
    selected: {
      stroke: '#f00',
      lineWidth: 3,
    },
  };
  const nodeStateStyles = {
    hover: {
      stroke: '#1890ff',
      lineWidth: 2,
    },
    selected: {
      stroke: '#f00',
      lineWidth: 3,
    },
    user: {
      stroke: '#ffd700',
      lineWidth: 3,
    },
  };

  return (
    <PageContentsLayout>
      <Col span={24}>
        <ChartsCard
          title="Map Of Account Transactions"
          description="The graph shows all the accounts interactions and the total sum of coins sent between them"
        >
          <DagreGraph
            nodeStyle={nodeStyle}
            layout={layoutCfg}
            height={850}
            nodeAnchorPoints={anchorPoints}
            nodeType={nodeType}
            nodeLabelCfg={nodeLabelCfg}
            minimapCfg={minimapCfg}
            behaviors={behaviors}
            data={data}
            handleEdgeClick={handleEdgeClick}
            handleCanvasClick={handleCanvasClick}
            edgeStateStyles={edgeStateStyles}
            nodeStateStyles={nodeStateStyles}
            handleNodeClick={handleNodeClick}
            graphId="dagreFirst"
          />
        </ChartsCard>
      </Col>
    </PageContentsLayout>
  );
};

export default TraceTransactions;
