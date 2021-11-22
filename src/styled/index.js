function styled(initExpresion = null) {
  if (!initExpresion) throw new Error('Wrong extended element');
  return function (strings,...functionExpressions) {
    return function (objArgs = {}) {
      const initialString = strings[0] || '';
      const expressionResult = (expression) => (
        ((typeof expression === 'function') ? expressionResult(expression(objArgs)) : expression) || ''
      );
      const cbForReduce = (acc, expression, index) => (
        acc + expressionResult(expression) + strings[index + 1]
      );
      const strToArray = (str) => {
        const strReplace = str.replace(/\n|\t/g, '').replace(/;;/g,';');
        const arrayStrEl = strReplace .split(';')
          .map((item) => item.split(': ').map(item => item && '"'+item+'"').join(': '));
        const resultArray = arrayStrEl.join(',').split('');
        return resultArray
      }
      const arrayToJsonStr = (arr) => {
        arr.pop();
        arr.push('}');
        arr.unshift('{');
        return arr.join('');
      }
      const jsonObjToCamelCaseObj = (obj) => (
        Object.keys(obj).reduce((acc, key) => ({
          ...acc,
          [key.trim().replace(/-[a-z]/g,(w) => w[1].toUpperCase())]: obj[key]
        }), {})
      )
      const restructResult = (str) => {
        const arrayOfSymbol = strToArray(str);
        const jsonStr = arrayToJsonStr(arrayOfSymbol);
        const jsonObj = JSON.parse(jsonStr);
        const  result = jsonObjToCamelCaseObj(jsonObj);
        return result;
      }
      const styles = (functionExpressions.length)
        ? functionExpressions.reduce(cbForReduce, initialString)
        : initialString;
      const resultStylesList = {
        ...restructResult(styles),
        ...(this?.postStylesList || {}),
      };
      if (typeof initExpresion === 'function') {
        return initExpresion.call({ postStylesList: resultStylesList }, objArgs);
      }
      const TagName = initExpresion;
      return (
        <TagName style={resultStylesList} {...objArgs} />
      );
    }
  };
}

styled = new Proxy(styled,{
  get(target, phrase) {
    if (phrase in target) {
      return target[phrase]
    } else {
      return target(phrase);
    }
  }
});

export default styled;
