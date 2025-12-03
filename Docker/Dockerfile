FROM ontotext/graphdb:10.7.0

# Install unzip
USER root
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*

# Create the repository directory structure
RUN mkdir -p /opt/graphdb/home/data/repositories

# Copy the zip file
COPY endPoint/test1.zip /tmp/test1.zip

# Unzip and move to the correct location
RUN unzip /tmp/test1.zip -d /tmp/unzipped && \
    mv /tmp/unzipped/test1 /opt/graphdb/home/data/repositories/test1 && \
    rm -rf /tmp/test1.zip /tmp/unzipped

# Overwrite config.ttl with the correct version
COPY config.ttl /opt/graphdb/home/data/repositories/test1/config.ttl

# Expose the default GraphDB port
EXPOSE 7200
