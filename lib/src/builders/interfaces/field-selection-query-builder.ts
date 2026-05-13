export interface IFieldSelectionQueryBuilder {
    includeIdentifier(): this;
    includeTitle(): this;
    includeCreator(): this;
    includeSubject(): this;
    includeDescription(): this;
    includeMediatype(): this;
    includeCollection(): this;
    includeDate(): this;
    includePublicdate(): this;
    includeDownloads(): this;
    includeAvgRating(): this;
    includeLanguage(): this;
    includeNumReviews(): this;
    includeWeek(): this;
    includeMonth(): this;
}
