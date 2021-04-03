import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import fs from 'fs';
import path from 'path';

export default class AppProvider {
	public static needsApplication = true

  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
    const View = (await import('@ioc:Adonis/Core/View')).default
    const Config = (await import('@ioc:Adonis/Core/Config')).default

    const honeyFields = Config.get('app.honeyFields');
    View.registerTemplate('honeypot', {
      template: honeyFields.map(f => `<input type="text" class="ohbother" name="${f}" />`).join('')
    })

    let publicPath = '/public';
    let mixManifest = null;

    View.global('mix', (fileName) => {
      try {
        if (!mixManifest) {
          let mixManifestString = fs.readFileSync(path.resolve(`.${publicPath}/mix-manifest.json`), 'utf8');
          mixManifest = JSON.parse(mixManifestString);
        }

        let publicFileName = publicPath + fileName;
        let hashedPublicFileName = (mixManifest ?? {})[publicFileName] || "";
        let hashedFileName = hashedPublicFileName.replace(publicPath, '');

        return mixManifest ? hashedFileName : fileName;
      } catch (e) {
        return fileName;
      }
    });
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
