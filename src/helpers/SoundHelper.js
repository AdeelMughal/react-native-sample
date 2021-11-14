import Sound from 'react-native-sound';
import utils from '../util';
import DataHelper from './DataHelper';
import {useSelector} from 'react-redux';
var url = require('url');

Sound.setCategory('Playback');

class SoundHelper {
  _soundInst;
  _bgSoundInst;
  _bookSoundInst;
  soundVolume = 1;

  setAppSound(sound) {
    this.soundVolume = sound;
  }

  playSound = (
    soundToPlay,
    doPlayExplicitly = false,
    callback: () => {},
    isBlocker = true,
    isInfinite = false,
    explicitVolume = 0,
  ) => {
    const playCommon = () => {
      if (DataHelper.isAppSoundEnabled() || doPlayExplicitly) {
        this._soundInst = new Sound(soundToPlay, (error) => {
          if (callback) {
            callback(error);
          }

          if (isInfinite) {
            this._soundInst?.setNumberOfLoops(-1);
          }

          this._soundInst?.setVolume(explicitVolume || this.soundVolume);
          this._soundInst?.play();
        });
      }
    };

    if (this._soundInst && isBlocker) {
      this._soundInst?.stop(() => {
        // Note: If you want to play a sound after stopping and rewinding it,
        // it is important to call play() in a callback.
        playCommon();
      });
    } else {
      playCommon();
    }
  };

  playBackgroundSound = (soundToPlay) => {
    if (DataHelper.isAppSoundEnabled() && utils.isRelease()) {
      this._bgSoundInst = new Sound(soundToPlay, (error) => {
        // if (callback) {
        //   callback(error);
        // }

        this._bgSoundInst?.setNumberOfLoops(-1);

        this._bgSoundInst?.setVolume(0.5);
        this._bgSoundInst?.play();
      });
    } else {
      this._bgSoundInst?.stop(() => {});
    }
  };

  onEnterBackground = () => {
    this._bgSoundInst?.stop(() => {});

    this._soundInst?.stop(() => {});

    this._bookSoundInst?.stop(() => {});
  };

  onEnterForeground = () => {
    this._bgSoundInst?.setVolume(this.soundVolume);
    this._bgSoundInst?.play();

    this._soundInst?.play();
  };

  playSoundUri = (urlString, callback = undefined, explicitVolume = 1) => {
    const parsedUrl = url.parse(urlString);

    const playCommon = () => {
      DataHelper.showAudioLoader();

      this._bookSoundInst = new Sound(
        parsedUrl.pathname,
        'https://' + parsedUrl.hostname,
        (error) => {
          DataHelper.hideAudioLoader();

          this._bookSoundInst.setVolume(explicitVolume || this.soundVolume);
          this._bookSoundInst.play((success) => {
            if (success) {
              if (callback) {
                callback();
              }
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        },
      );
    };

    if (this._bookSoundInst) {
      this._bookSoundInst.stop(() => {
        // Note: If you want to play a sound after stopping and rewinding it,
        // it is important to call play() in a callback.
        playCommon();
      });
    } else {
      playCommon();
    }
  };

  stopSound = () => {
    this._soundInst?.stop(() => {});
    this._bookSoundInst?.stop(() => {});
  };

  stopBackgroundSound = () => {
    this._bgSoundInst?.stop(() => {});
  };
}

export default new SoundHelper();
