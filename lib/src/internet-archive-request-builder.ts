import QueryBuilder from "./builders/query-builder";
import FieldSelectionQueryBuilder from "./builders/field-selection-query-builder";
import FilterQueryBuilder from "./builders/filter-query-builder";

export default class InternetArchiveRequestBuilder extends
    FilterQueryBuilder(FieldSelectionQueryBuilder(QueryBuilder)) {}
