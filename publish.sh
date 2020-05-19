read -p "you sure? (y/*) " shouldContinue
if [ "$shouldContinue" != "y" ]; then
	exit
fi

if [[ ! -z $(git status -s) ]]; then
    echo "found uncommited changes, exiting"
    exit
fi

rm -r dist || true
tsc
rm -r dist/__tests__
cp LICENSE dist/LICENSE
cp README.md dist/README.md
cp package.json dist/package.json
npm publish dist
git tag $(cat package.json | grep version | sed -r 's/.*"version": "(.*)".*/v\1/')
rm -r dist
