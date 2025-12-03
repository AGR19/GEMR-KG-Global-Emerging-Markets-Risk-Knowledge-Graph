# GraphDB Docker Setup

This guide explains how to build and run the custom GraphDB Docker image with the preloaded `test1` repository.

## Prerequisites
- Docker installed
- `endPoint/test1.zip` present in the project root
- `config.ttl` present in the project root

## 1. Build the Image
Run this command from the directory containing the `Dockerfile`:

```bash
docker build -t my-graphdb-image .
```

## 2. Run the Container

### Option A: Detached Mode (Background)
Use this for normal operation. The container runs in the background.

```bash
docker run -d -p 7200:7200 --name graphdb-instance my-graphdb-image
```

### Option B: Attached Mode (Interactive)
Use this to see logs in real-time. Press `Ctrl+C` to stop.

```bash
docker run -p 7200:7200 --name graphdb-instance my-graphdb-image
```

## 3. Access GraphDB
- **Workbench**: [http://localhost:7200](http://localhost:7200)
- **SPARQL Endpoint**: [http://localhost:7200/repositories/test1](http://localhost:7200/repositories/test1)

## 4. Stop and Remove
To stop and remove the container (needed if you want to run it again with the same name):

```bash
docker rm -f graphdb-instance
```

## 5. Remove the Image
To remove the image (needed if you want to rebuild it):

```bash
docker rmi my-graphdb-image
```

## 6. Accessing the GraphDB Workbench

Open your web browser and navigate to 
[http://localhost:7200](http://localhost:7200) 
You should see the GraphDB Workbench interface.

## 7. Sample SPARQL Query in curl
```bash
curl -G -H "Accept: application/sparql-results+json" \
--data-urlencode "query=PREFIX gemr: <https://gemr-kg.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?year ?value
WHERE {
  ?obs a gemr:Observation ;
       gemr:hasCountry ?country ;
       gemr:hasIndicator ?indicator ;
       gemr:hasYear ?yearEntity ;
       gemr:observationValue ?value .

  # Filter for China (matches both gemr:China and <#China...>)
  ?country gemr:countryName \"China\" .

  ?yearEntity gemr:yearValue ?year .

  # Filter for CPI using string matching to handle relative IRIs
  FILTER(REGEX(STR(?indicator), \"CPI_Price\", \"i\"))
}
ORDER BY ?year" \
http://localhost:7200/repositories/test1
```

