import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setEntryPoint('./src/index.ts');
Config.setConcurrency(1);
