import generate from "@babel/generator";
import type { Transform } from "./Transform";
import * as t from "@babel/types";

export default {
    name: "Dispatcher",
    preRunWebcrack: false,
    postRunWebcrack: false,
    contextedVisitor: context => ({
        on: isEstimate => {
            const isNotEstimate = !isEstimate;

            return {
                FunctionDeclaration(path) {
                    const {
                        node,
                        node: {
                            params,
                            body: { body },
                        },
                    } = path;

                    if (params.length !== 4)
                        return;

                    const { length: bodyLength } = body;

                    if (bodyLength !== 5)
                        return;

                    const bodyFirstStatement = body[0];
                    if (!(
                        t.isVariableDeclaration(bodyFirstStatement) &&
                        bodyFirstStatement.declarations.length === 1 &&
                        t.isIdentifier(bodyFirstStatement.declarations[0].id) &&
                        !bodyFirstStatement.declarations[0].init
                    ))
                        return;

                    const { declarations: { 0: { id: outputVariableName } } } = bodyFirstStatement;

                    const bodySecondStatement = body[1];
                    if (!(
                        t.isVariableDeclaration(bodySecondStatement) &&
                        bodySecondStatement.declarations.length === 1 &&
                        t.isIdentifier(bodySecondStatement.declarations[0].id) &&
                        t.isObjectExpression(bodySecondStatement.declarations[0].init) &&
                        bodySecondStatement.declarations[0].init.properties.every(
                            property =>
                                t.isObjectProperty(property) &&
                                t.isIdentifier(property.key) &&
                                t.isFunctionExpression(property.value),
                        )
                    ))
                        return;

                    const bodyLastStatement = body[bodyLength - 1];
                    if (!(
                        t.isIfStatement(bodyLastStatement) &&
                        bodyLastStatement.alternate &&
                        t.isBlockStatement(bodyLastStatement.alternate) &&
                        t.isBlockStatement(bodyLastStatement.consequent) &&
                        bodyLastStatement.consequent.body.length === 1 &&
                        t.isReturnStatement(bodyLastStatement.consequent.body[0]) &&
                        t.isObjectExpression(bodyLastStatement.consequent.body[0].argument) &&
                        bodyLastStatement.consequent.body[0].argument.properties.length === 1 &&
                        t.isObjectProperty(bodyLastStatement.consequent.body[0].argument.properties[0]) &&
                        t.isIdentifier(bodyLastStatement.consequent.body[0].argument.properties[0].key)
                    ))
                        return;


                },
            };
        },
        pre: null,
        post: null,

        first: null,
        final: null,
    }),
} satisfies Transform;