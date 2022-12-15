import { CollectionMetadata } from "./collection-metadata";
import { FieldMetadata } from "./field-metadata";
import { PrimaryKeyMetadata } from "./primary-key-metadata";

/**
 * Temporary storage for storing metadata processed by decorators. Classes can
 * be loaded in any order, schema generation cannot start until all class metadata
 * is available.
 *
 * @internal
 */
export class DecoratorMetaStorage {
	readonly collections: Map<string, CollectionMetadata> = new Map();
	readonly fields: Array<FieldMetadata> = new Array<FieldMetadata>();
	readonly primaryKeys: Array<PrimaryKeyMetadata> = new Array<PrimaryKeyMetadata>();

	filterCollectionByTarget(target: Function): CollectionMetadata {
		for (const collection of this.collections.values()) {
			if (collection.target === target) {
				return collection;
			}
		}
	}

	filterFieldsByTarget(target: Function): FieldMetadata[] {
		return this.fields.filter(function (field) {
			return field.target === target;
		});
	}

	filterPKsByTarget(target: Function): PrimaryKeyMetadata[] {
		return this.primaryKeys.filter(function (pk) {
			return pk.target === target;
		});
	}
}