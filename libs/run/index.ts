export default function run(props: string) {
  const com = props.replace(/-/g, ' ')
  // console.log(com)
  // debugger;
  if (com.split(' ')[0] === 'run') {
    // let application = com.split(' ')[1].split('.')[0] === 'application' ? com.split(' ')[1].split('.')[1] : com.split(' ')[1]
    if (com.split(' ')[1].split('.')[0] === 'application') {
      const app = com.split(' ')[1].split('.')[1]
      const path = `../applications/${app}/settings.ts`
      const settings = require(path)
      return settings.settings
    }
  }
}
