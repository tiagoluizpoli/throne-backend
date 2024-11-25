import { Entity } from '../core';

interface JsonSchemaProps {
  name: string;
  schema: object;
  metadata?: object;
}

export class JsonSchema extends Entity<JsonSchemaProps> {
  private constructor(props: JsonSchemaProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get schema(): object {
    return this.props.schema;
  }

  get metadata(): object | undefined {
    return this.props.metadata;
  }

  static create(props: JsonSchemaProps, id?: string): JsonSchema {
    return new JsonSchema(props, id);
  }
}
