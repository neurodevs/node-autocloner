import NeurodevsAutocloner from './components/NeurodevsAutocloner'

async function main() {
    const cloner = NeurodevsAutocloner.Create()
    await cloner.run('/Users/ericthecurious/dev')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
