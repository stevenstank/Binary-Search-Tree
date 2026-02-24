const { Tree, prettyPrint } = require('./bst');

const randomArray = (n = 15, max = 100) => {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(Math.floor(Math.random() * max));
  return arr;
};

const demo = () => {
  console.log('--- Creating tree from random array (<100) ---');
  const arr = randomArray(15, 100);
  console.log('input array:', arr);
  const tree = new Tree(arr);

  console.log('isBalanced?', tree.isBalanced());
  console.log('\nPretty print tree:');
  prettyPrint(tree.root);

  const collect = (fn) => {
    const out = [];
    fn.call(tree, (v) => out.push(v));
    return out;
  };

  console.log('\nLevel order:', collect(tree.levelOrderForEach));
  console.log('Pre order:', collect(tree.preOrderForEach));
  console.log('In order:', collect(tree.inOrderForEach));
  console.log('Post order:', collect(tree.postOrderForEach));

  console.log('\n--- Unbalancing the tree by inserting large ascending values ---');
  for (let v = 101; v <= 110; v++) tree.insert(v);
  console.log('isBalanced after inserts?', tree.isBalanced());
  prettyPrint(tree.root);

  console.log('\n--- Rebalancing ---');
  tree.rebalance();
  console.log('isBalanced after rebalance?', tree.isBalanced());
  prettyPrint(tree.root);

  console.log('\nTraversals after rebalance:');
  console.log('Level order:', collect(tree.levelOrderForEach));
  console.log('Pre order:', collect(tree.preOrderForEach));
  console.log('In order:', collect(tree.inOrderForEach));
  console.log('Post order:', collect(tree.postOrderForEach));
};

if (require.main === module) demo();

module.exports = { demo };
